const joi = require('@hapi/joi');

const resetValidation = joi.object({
    password: joi.string().min(6),
    confirm: joi.string().min(6)
});

const forgotValidation = joi.object({
    email: joi.string().required().email().min(6).max(200)
});

const resetValidate = (data) => {
    return resetValidation.validate(data);
};

const forgotValidate = (data) => {
    return forgotValidation.validate(data);
};

module.exports.resetValidate = resetValidate;
module.exports.forgotValidate = forgotValidate;