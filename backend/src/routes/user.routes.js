// user.routes.js
const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// User-related routes (protected by JWT middleware)
router.get('/profile', authMiddleware, UserController.getProfile);   // Get user profile
router.put('/profile', authMiddleware, UserController.updateProfile); // Update user profile

module.exports = router;
