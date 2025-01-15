const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address:Joi.string().min(10).required(),
    role:Joi.string().valid('admin', 'customer'). required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});



module.exports = { registerSchema, loginSchema };