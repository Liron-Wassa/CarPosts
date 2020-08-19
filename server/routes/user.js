const { registerValidate, loginValidate } = require('../validation/auth');
const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../modules/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const { name, email, password, confirm } = req.body;

    if(Number(password) !== Number(confirm)) {
        return res.status(400).json({
            message: 'Password not mutch'
        });
    };

    const { error } = registerValidate(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });

    User.findOne({email: email}, (err, user) => {
        if(err) return res.status(500).json({
            message: 'Internal Error'
        });
        if(user) return res.status(409).json({
            message: 'Email exist'
        });
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) return res.status(500).json({
                message: 'Internal Error'
            });
            const newUser = new User({
                name: name,
                email: email,
                password: hash
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

    User.findOne({facebookId: facebookId}, (err, user) => {
        if(err) return res.status(500).json({
            message: 'Internal Error'
        });
        if(user) {
            authenticateUser(req, res, next);
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) return res.status(500).json({
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

router.get('/user', (req, res) => {
    res.send(req.user);
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