// review.service.js
const Review = require('../models/mongoModels/Review'); // Import the Mongoose Review model
const  ProductService  = require('../services/product.service');
const ReviewService = {
  async createReview(reviewData) {
    const review = new Review(reviewData); // Create a new review instance
    return await review.save(); // Save the review to the database
  },

  async getReviewsByProductId(productId) {
    // Fetch the product by its ID
    const product = await ProductService.getProductById(productId);
  
    if (!product) {
      throw new Error('Product not found'); // Correct way to throw an error
    }
  
    // Find reviews for the product
    const reviews = await Review.find({ product_id: productId });
  
    if (!reviews || reviews.length === 0) {
      throw new Error('No reviews found for this product.');
    }
  
    return reviews; // Return the found reviews
  },

  async getReviewsByUserId(userId) {

    const reviews = await Review.find({ user_id: userId }); // Find reviews by a specific user
    if (!reviews) {
      throw new Error('Review not found.');
    }
    return reviews;
  },

  async deleteReview(reviewId) {
    return await Review.findByIdAndDelete(reviewId); // Delete a review
  },


  async updateReviewByReviewId (reviewId, updateData) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found.');
    }
  
    // Update the fields
    if (updateData.rating) review.rating = updateData.rating;
    if (updateData.comment) review.comment = updateData.comment;
  
    await review.save(); // Update review
    return review;
  },
};

module.exports = ReviewService;
