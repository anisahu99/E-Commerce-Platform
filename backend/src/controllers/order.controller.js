// order.controller.js
const OrderService = require('../services/order.service');
const ProductService = require('../services/product.service');

const OrderController = {
  async createOrder(req, res) {
    try {
      const user_id = req.user.userId; // Extracted from JWT middleware
      const { orderItem } = req.body;

      // Calculate total amount dynamically
      let total_amount = 0;
      let orderItemWithPrice = [];
      
      for(const item of orderItem){
        const product = await ProductService.getProductById(item.product_id);
        if (!product) {
          return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
        }

        if (product.stock < item.quantity) {
          return res
            .status(400)
            .json({ message: `Not enough stock for product: ${product.name}` });
        }

        total_amount += product.price * item.quantity;
        const itemWithPrice = {
          ...item,
          price:product.price
        }
        orderItemWithPrice.push(itemWithPrice);
      }


      const order = await OrderService.createOrder(
        { user_id, total_amount, status: 'pending' },
        orderItemWithPrice
      );

      res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  },

  async getOrderById(req, res) {
    try {
      const { order_id } = req.params;
      const user = req.user;
      const order = await OrderService.getOrderById(order_id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      if(order.user_id!==user.userId){
        return res.status(403).json({ message: 'Access denied'});
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching order by id', error: error.message });
    }
  },

  async getUserOrders(req, res) {
    try {
      const user_id = req.user.userId;
      const orders = await OrderService.getOrdersByUserId(user_id);

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const { order_id, status } = req.body;

      await OrderService.updateOrderStatus(order_id, status);
      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  },

    async getAllOrders (req, res){
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = OrderController;
