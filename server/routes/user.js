const { registerValidate, loginValidate } = require('../validation/auth');
const checkConfirmAccount = require('../middleware/checkConfirmAccount');
const { sendConfirmAccountEmail } = require('../utils/email');
const ActiveAccountRequest = require('../modules/active');
const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../modules/user');
const passport = require('passport');
const uuid = require('uuid-random');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send(req.user);
});

router.post('/register', (req, res) => {
    const { name, email, password, confirm } = req.body;
    if(password !== confirm) {
        return res.status(400).json({
            message: 'Password not mutch'
        });
    };

    const { error } = registerValidate(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });

    User.findOne({email: email}, (error, user) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        if(user) return res.status(409).json({
            message: 'Email exist'
        });

        bcrypt.hash(password, 10, (error, hash) => {
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });

            const id = uuid();
            const newAccountRequest = new ActiveAccountRequest({
                id: id,
                name: name,
                email: email,
                password: hash
            });
            newAccountRequest.save();

            const token = jwt.sign({requestId: id}, process.env.SECRET, {
                expiresIn: "10m"
            });
            return sendConfirmAccountEmail(req, res, email, token);
        });
    });
});

router.post('/confirm/:token', checkConfirmAccount, (req, res) => {
    ActiveAccountRequest.findOne({id: req.confirmData.requestId}, (error, request) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        if (!request) return res.status(404).json({
            message: 'Confirmed faild'
        });
        User.findOne({email: request.email}, (error, user) => {
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });
            if(user) return res.status(404).json({
                message: 'Link not available'
            });
            const newUser = new User({
                name: request.name,
                email: request.email,
                password: request.password
            });
            newUser.save();
            res.sendStatus(201);
        });
    });
});

router.post('/login', (req, res, next) => {
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });
    authenticateUser(req, res, next);
});

router.post('/auth/facebook', (req, res, next) => {
    
    const { name, email, facebookId, password } = req.body;

    User.findOne({facebookId: facebookId}, (error, user) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        if(user) {
            authenticateUser(req, res, next);
        }
        else {
            bcrypt.hash(password, 10, (error, hash) => {
                if(error) return res.status(500).json({
                    message: 'Internal Error'
                });
                const newUser = new User({
                    name: name,
                    email: email,
                    facebookId: facebookId,
                    password: hash
                });
                newUser.save(() => {
                    authenticateUser(req, res, next);
                });
            });
        };
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.sendStatus(200);
});

function authenticateUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(500).json({
            message: 'Internal Error'
        });
        if (!user) return res.status(401).json({
            message: 'Email or password worng'
        });
        req.logIn(user, (err) => {
            if(err) return res.status(500).json({
                message: 'Internal Error'
            });
            res.json({userId: user.id});
        });
    })(req, res, next);
};

module.exports = router;