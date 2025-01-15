// cart.controller.js
const CartService = require('../services/cart.service');

const CartController = {
    
  async addToCart(req, res) {
    try {
      const { product_id, quantity } = req.body;
      const user_id = req.user.userId; // Extracted from JWT middleware

      const cartItem = await CartService.addToCart(user_id, product_id, quantity);
      res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
  },

  async getCart(req, res) {
    try {
      const user_id = req.user.userId;
      const cartItems = await CartService.getCartByUserId(user_id);
      
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
  },

  async updateCartItem(req, res) {
    try {
      const productId = req.params.product_id;
      const { quantity } = req.body;
      const userId = req.user.userId;
      await CartService.updateCartItem(userId, productId, quantity);

      res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
  },

  async removeCartItem(req, res) {
    try {
      const productId = req.params.product_id;
      const userId = req.user.userId;
      await CartService.removeCartItem(userId, productId);

      res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing cart item', error: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const user_id = req.user.userId;
      await CartService.clearCart(user_id);

      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
  },
};

module.exports = CartController;
