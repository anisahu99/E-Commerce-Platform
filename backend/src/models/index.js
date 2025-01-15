// Relations & Associations
const { sequelize } = require('../config/postgres');
const User = require('./User');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');

// User -> Order (1:N)
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order -> OrderItem (1:N)
Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Product -> OrderItem (1:N)
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// User -> Cart (1:N)
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// Product -> Cart (1:N)
Product.hasMany(Cart, { foreignKey: 'product_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { sequelize, User, Product, Order, OrderItem, Cart };