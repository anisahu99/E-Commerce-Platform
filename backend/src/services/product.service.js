// product.service.js
const { Product } = require('../models/index');

const ProductService = {
  async createProduct(productData) {
    return await Product.create(productData); // Create a new product
  },

  async getProductById(product_id) {
    return await Product.findByPk(product_id); // Find product by primary key
  },

  async getAllProducts() {
    return await Product.findAll(); // Retrieve all products
  },

  async updateProduct(productId, updates) {
    return await Product.update(updates, { where: { product_id: productId } }); // Update product details
  },

  async deleteProduct(productId) {
    return await Product.destroy({ where: { product_id: productId } }); // Delete product
  },
};

module.exports = ProductService;
