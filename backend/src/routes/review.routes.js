// review.routes.js
const express = require('express');
const ReviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware'); 
const validateMiddleware = require('../middleware/validate.middleware'); 
const { createReviewSchema, updateReviewSchema } = require('../validators/review.validators');

const router = express.Router();

// Review routes
router.post('/', validateMiddleware(createReviewSchema), authMiddleware, ReviewController.createReview);           // Create a review
router.get('/:product_id', ReviewController.getProductReviews);            // Get reviews for a product
router.get('/:user_id', ReviewController.getReviewsByUserId);            // Get reviews given by specific user
router.delete('/:product_id', authMiddleware, ReviewController.deleteReview); // Delete a review
router.put('/:product_id', validateMiddleware(updateReviewSchema), authMiddleware, ReviewController.updateReview);          // Update a review

module.exports = router;
