'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Inventory.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    status: DataTypes.ENUM('OUTOFSTOCK', 'AVAILABLE', 'NOTACTIVE'),
    featureImageUrl: DataTypes.STRING,
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};