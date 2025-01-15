const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');

const OrderItem = sequelize.define('OrderItem', {
  order_item_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = OrderItem;
