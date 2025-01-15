// order.service.js
const { Order, OrderItem, Product, User } = require('../models/index');

const OrderService = {
  async createOrder(orderData, orderItems) {
    const order = await Order.create(orderData); // Create the order

    // Bulk create order items
    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.order_id,
    }));
    await OrderItem.bulkCreate(itemsWithOrderId);

    return order;
  },

  async getOrderById(orderId) {
    return await Order.findByPk(orderId, {
      include: ['OrderItems'], // Include order items
    });
  },

  async getOrdersByUserId(userId) {
    return await Order.findAll({
      where: { user_id: userId },
      include: ['OrderItems'],
    });
  },

  async updateOrderStatus(orderId, status) {
    return await Order.update({ status }, { where: { order_id: orderId } });
  },

  async deleteOrder(orderId) {
    return await Order.destroy({ where: { order_id: orderId } });
  },

  // Fetch all orders
  async getAllOrders(){
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'name', 'email'], // Include basic user details
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ['product_id', 'name', 'price'], // Include product details
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']], // Sort by newest orders first
    });
    return orders;
  },
  
};

module.exports = OrderService;
