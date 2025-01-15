// product.controller.js
const ProductService = require('../services/product.service');

const ProductController = {
  async createProduct(req, res) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  },

  async getProduct(req, res) {
    try {
      // console.log('req.params.product_id: ',req.params.product_id);
      const product = await ProductService.getProductById(req.params.product_id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  },
  async updateProduct(req, res) {
    try{
      const productId = req.params.product_id;
      const product = await ProductService.getProductById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const updates = req.body;
      const updatedProduct = await ProductService.updateProduct(productId,updates);
      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = ProductController;
