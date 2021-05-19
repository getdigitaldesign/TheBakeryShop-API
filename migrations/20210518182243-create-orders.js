'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      customerId: {
        type: Sequelize.UUID
      },
      items: {
        type: Sequelize.JSON
      },
      subtotal: {
        type: Sequelize.DOUBLE
      },
      tax: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DOUBLE
      },
      status: {
        type: Sequelize.ENUM('ORDERED', 'BAKING', 'READY', 'SHIPPED')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};