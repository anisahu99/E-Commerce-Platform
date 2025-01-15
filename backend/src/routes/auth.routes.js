// auth.routes.js
const AuthController = require('../controllers/auth.controller');
const express = require('express');
const { registerSchema, loginSchema } = require('../validators/auth.validators');
const validateMiddleware = require('../middleware/validate.middleware'); 

const router = express.Router();

// Routes for authentication
router.post('/register', validateMiddleware(registerSchema), AuthController.register); // Register new user
router.post('/login', validateMiddleware(loginSchema), AuthController.login); // Login user

module.exports = router;