const joi = require('@hapi/joi');

const registerValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email().min(6).max(200),
    password: joi.string().min(6),
    confirm: joi.string().min(6)
});

const loginValidation = joi.object({
    email: joi.string().required().email().min(6).max(200),
    password: joi.string().min(6)
});

const registerValidate = (data) => {
    return registerValidation.validate(data);
};

const loginValidate = (data) => {
    return loginValidation.validate(data);
};

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;