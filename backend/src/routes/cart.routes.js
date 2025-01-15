// cart.routes.js
const express = require('express');
const CartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { addToCartSchema, updateCartItemSchema } = require('../validators/cart.validators');
const validateMiddleware = require('../middleware/validate.middleware');

const router = express.Router();

// Cart routes (protected by JWT middleware)
router.post('/', authMiddleware, validateMiddleware(addToCartSchema), CartController.addToCart);       // Add item to cart
router.get('/', authMiddleware, CartController.getCart);          // View cart
router.put('/:product_id', authMiddleware, validateMiddleware(updateCartItemSchema), CartController.updateCartItem);   // Update cart item quantity
router.delete('/:product_id', authMiddleware, CartController.removeCartItem); // Remove item
router.delete('/', authMiddleware, CartController.clearCart);     // Clear cart

module.exports = router;
