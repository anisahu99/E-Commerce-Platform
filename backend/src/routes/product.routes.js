// product.routes.js
const express = require('express');
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { createProductSchema, updateProductSchema } = require('../validators/product.validators');
const validateMiddleware = require('../middleware/validate.middleware');



const router = express.Router();

// Product routes


// Public routes
router.get('/:product_id', ProductController.getProduct);   // Get a single product
router.get('/', ProductController.getAllProducts);  // Get all products

// Admin-only routes
router.post('/', authMiddleware, roleMiddleware('admin'), validateMiddleware(createProductSchema), ProductController.createProduct); // Create a single Product
router.put('/:product_id', authMiddleware, roleMiddleware('admin'), validateMiddleware(updateProductSchema), ProductController.updateProduct);  // Update a single product

module.exports = router;
