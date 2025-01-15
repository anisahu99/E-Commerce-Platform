const Joi = require('joi');

const createReviewSchema = Joi.object({
    product_id: Joi.string().required(),

    rating:Joi.number().integer().positive().min(1).max(5).required(),
    comment:Joi.string().optional(),
});

const updateReviewSchema = Joi.object({
    product_id: Joi.string().required(),
    rating:Joi.number().integer().positive().min(1).max(5).optional(),
    comment:Joi.string().optional(),
})

module.exports = {
    createReviewSchema,
    updateReviewSchema
}