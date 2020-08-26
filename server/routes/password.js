const { resetValidate, forgotValidate } = require('../validation/forgot');
const checkResetPassword = require('../middleware/checkResetPassword');
const { sendResetPasswordEmail } = require('../utils/email');
const ResetPasswordRequest = require('../modules/password');
const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../modules/user');
const uuid = require('uuid-random');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/forgot', (req, res) => {
    const { email } = req.body;    
    const { error } = forgotValidate(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });
    User.findOne({email: email}, (error, user) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        if (!user) return res.status(404).json({
            message: 'Email not found'
        });

        const id = uuid();
        const resetRequest = {
            id: id,
            email: user.email
        };

        ResetPasswordRequest.create(resetRequest, (error, request) => {            
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });
            const token = jwt.sign({requestId: id}, process.env.SECRET, {
                expiresIn: "10m"
            });
            return sendResetPasswordEmail(req, res, email, token);
        });
    });
});

router.patch('/reset/:token', checkResetPassword, (req, res) => {
    const { password, confirm } = req.body;
    if(password !== confirm) {
        return res.status(400).json({
            message: 'Password not mutch'
        });
    };
    const { error } = resetValidate(req.body);
    if (error) return res.status(400).json({
        message: error.details[0].message
    });
    
    ResetPasswordRequest.findOne({id: req.resetData.requestId}, (error, request) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        if (!request) return res.status(404).json({
            message: 'Link not available'
        });

        User.findOne({email: request.email}, (error, user) => {
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });
            if (!user) return res.status(404).json({
                message: 'Request faild'
            });            
            if (request.confirm) return res.status(404).json({
                message: 'Link not available'
            });
            bcrypt.hash(password, 10, (error, hash) => {
                if(error) return res.status(500).json({
                    message: 'Internal Error'
                });
                user.password = hash;
                request.confirm = true;
                user.save();
                request.save();
                res.sendStatus(201);
            });
        });
    });
});

module.exports = router;