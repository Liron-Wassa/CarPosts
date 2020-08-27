const ResetPasswordRequest = require('../modules/password');
const ActiveAccountRequest = require('../modules/active');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const checkResetTimeout = (req, res, email, time) => {
    setTimeout(() => {
        ResetPasswordRequest.deleteOne({email: email}, (error, request) => {
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });
            return;
        });
    }, time * 1000 - new Date().getTime());
};

const checkConfirmTimeout = (req, res, email, time) => {
    setTimeout(() => {
        ActiveAccountRequest.deleteOne({email: email}, (error, request) => {
            if(error) return res.status(500).json({
                message: 'Internal Error'
            });
            return;
        });
    }, time * 1000 - new Date().getTime());
};

const sendResetPasswordEmail = (req, res, email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'https://car-posts.herokuapp.com',
        port: 587,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });
    const mailOption = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Reset password',
        text: `This link will be active 10 minutes.
        To reset your password click on this link: https://car-posts.herokuapp.com/reset/${token}`
    };
    transporter.sendMail(mailOption, (error, info) => {
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        const decodedToken = jwt.decode(token);
        const time = decodedToken.exp;
        checkResetTimeout(req, res, email, time);
        return res.status(201).json({
            message: 'Check Your Email'
        });
    });
};

const sendConfirmAccountEmail = (req, res, email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'https://car-posts.herokuapp.com',
        port: 587,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });
    const mailOption = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Confirm account',
        text: `This link will be active 10 minutes.
        Click to confirm your account: https://car-posts.herokuapp.com/confirm/${token}`
    };

    transporter.sendMail(mailOption, (error, info) => {        
        if(error) return res.status(500).json({
            message: 'Internal Error'
        });
        const decodedToken = jwt.decode(token);
        const time = decodedToken.exp;
        checkConfirmTimeout(req, res, email, time);
        return res.status(201).json({
            message: 'Check your email'
        });
    });
};

module.exports.sendConfirmAccountEmail = sendConfirmAccountEmail;
module.exports.sendResetPasswordEmail = sendResetPasswordEmail;