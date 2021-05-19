'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Orders.init({
    customerId: DataTypes.UUID,
    items: DataTypes.JSON,
    subtotal: DataTypes.DOUBLE,
    tax: DataTypes.DECIMAL,
    total: DataTypes.DOUBLE,
    status: DataTypes.ENUM('ORDERED', 'BAKING', 'READY', 'SHIPPED')
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};