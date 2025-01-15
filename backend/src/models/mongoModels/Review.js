const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    ref: 'Product',
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Review', reviewSchema);
