const Joi = require('joi');

// Validation schema for creating an order item
const createOrderItemSchema = Joi.object({
    order_id: Joi.string().required(),  //Reference to the Order ID
    product_id: Joi.string().required(),    // Reference to the Product ID
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().positive().required(),
});

// Validation schema for updating an order item
const updateOrderItemSchema = Joi.object({
    order_item_id: Joi.string().required(), // Reference to the Order Item ID
    quantity: Joi.number().integer().min(1).optional(),
    price: Joi.number().positive().optional(),
});
  
module.exports = { createOrderItemSchema, updateOrderItemSchema };