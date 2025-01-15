const Joi = require('joi');
// Validation schema for creating an order
const createOrderSchema = Joi.object({
    orderItem: Joi.array().items(
        Joi.object({
            product_id: Joi.string().required(), // Reference to the Product ID
            quantity: Joi.number().integer().positive().min(1).required(),
        })
    )
    .min(1).required(), // At least one item is required
    // address: Joi.string().min(10).max(200).required() ,  // Address for delivery
})

const updateOrderSchema = Joi.object({
    order_id: Joi.string().required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled'). required(),
})

module.exports = { createOrderSchema, updateOrderSchema };
