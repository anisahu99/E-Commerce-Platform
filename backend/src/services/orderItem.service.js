// orderItem.service.js
const { OrderItem } = require('../models/index');

const OrderItemService = {
  async createOrderItem(orderItemData) {
    return await OrderItem.create(orderItemData); // Create a single order item
  },

  async getOrderItemsByOrderId(orderId) {
    return await OrderItem.findAll({ where: { order_id: orderId } }); // Find items for a specific order
  },

  async updateOrderItem(orderItemId, updates) {
    return await OrderItem.update(updates, { where: { order_item_id: orderItemId } });
  },

  async deleteOrderItem(orderItemId) {
    return await OrderItem.destroy({ where: { order_item_id: orderItemId } });
  },
};

module.exports = OrderItemService;
