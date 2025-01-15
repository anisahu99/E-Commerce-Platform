const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/postgres');

const Cart = sequelize.define('Cart', {
  cart_id: {
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
}, {
  timestamps: true,
});

module.exports = Cart;
