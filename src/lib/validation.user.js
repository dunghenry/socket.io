const Joi = require('joi');
const validationRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().pattern(new RegExp('@gmail.com$')).email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
    })
    return schema.validate(data);
}
const validationLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().pattern(new RegExp('@gmail.com$')).email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
    })
    return schema.validate(data);
}
module.exports = { validationRegister, validationLogin };