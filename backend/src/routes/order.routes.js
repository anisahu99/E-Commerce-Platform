// order.routes.js
const express = require('express');
const OrderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const { createOrderSchema, updateOrderSchema } = require('../validators/order.validators');
const validateMiddleware = require('../middleware/validate.middleware');

const router = express.Router();

// Order routes
router.post('/', authMiddleware,validateMiddleware(createOrderSchema), OrderController.createOrder);              // Place an order
router.get('/all', authMiddleware, roleMiddleware('admin'), OrderController.getAllOrders); // Admin-only route to fetch all orders
router.get('/:order_id', authMiddleware, OrderController.getOrderById);     // Get a single order
router.get('/', authMiddleware, OrderController.getUserOrders);             // Get all orders for a user
router.put('/:order_id', authMiddleware, roleMiddleware('admin'), validateMiddleware(updateOrderSchema) ,OrderController.updateOrderStatus); // Admin only

module.exports = router;
