// cart.service.js
const { Cart } = require('../models/index');

const CartService = {
    
  async addToCart(userId, productId, quantity) {
    const existingItem = await Cart.findOne({ where: { user_id: userId, product_id: productId } });

    if (existingItem) {
      // Update quantity if the product is already in the cart
      existingItem.quantity += quantity;
      return await existingItem.save();
    }

    // Otherwise, create a new cart item
    return await Cart.create({ user_id: userId, product_id: productId, quantity });
  },

  async getCartByUserId(userId) {
    return await Cart.findAll({ where: { user_id: userId } }); // Retrieve all cart items for a user
  },

  async updateCartItem(userId, productId, quantity) {
    return await Cart.update({ quantity }, { where: { user_id: userId, product_id: productId } }); // Update cart item quantity
  },

  async removeCartItem(userId, productId) {
    return await Cart.destroy({ where: { user_id: userId, product_id: productId } }); // Remove an item from the cart
  },

  async clearCart(userId) {
    return await Cart.destroy({ where: { user_id: userId } }); // Clear all items from the cart for a user
  },
};

module.exports = CartService;
