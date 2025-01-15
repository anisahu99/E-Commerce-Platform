// review.controller.js
const ReviewService = require("../services/review.service");
const Review = require("../models/mongoModels/Review");
const ProductService = require('../services/product.service');

const ReviewController = {
  async createReview(req, res) {
    try {
      const user_id = req.user.userId; // Extracted from JWT middleware
      const { product_id, rating, comment } = req.body;

      const product = await ProductService.getProductById(product_id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const existingReview = await Review.findOne({ product_id, user_id });

      if (existingReview) {
        // User has already reviewed this product
        return res.status(409).json({
          success: false,
          message: "User already reviewed this product.",
        });
      } else {
        const review = await ReviewService.createReview({
          user_id,
          product_id,
          rating,
          comment,
        });
        res
          .status(201)
          .json({ message: "Review added successfully", review });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating review", error: error.message });
    }
  },

  async updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const { rating, comment } = req.body;

      const updatedReview = await ReviewService.updateReviewByReviewId(
        reviewId,
        { rating, comment }
      );

      res.status(200).json({
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getProductReviews(req, res) {
    try {
      const { product_id } = req.params;

      const reviews = await ReviewService.getReviewsByProductId(product_id);
      res.status(200).json(reviews);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching reviews", error: error.message });
    }
  },

  async getReviewsByUserId(req, res) {
    try {
      const { user_id } = req.params;

      const reviews = await ReviewService.getReviewsByUserId(user_id);
      res.status(200).json(reviews);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching reviews", error: error.message });
    }
  },

  async deleteReview(req, res) {
    try {
      const { review_id } = req.params;
      await ReviewService.deleteReview(review_id);

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting review", error: error.message });
    }
  },
};

module.exports = ReviewController;
