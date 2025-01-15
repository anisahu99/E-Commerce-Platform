const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().min(3).max(50).required(),
  image_url: Joi.string().uri().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.string().min(3).max(50).optional(),
  image_url: Joi.string().uri().optional(),
});

module.exports = { createProductSchema, updateProductSchema };
