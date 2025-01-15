const { DataTypes } = require('sequelize');
const { sequelize }= require('../config/postgres');

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = Order;
