'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PurchaseItemDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ItemMaster",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      defaultPurchaseCost: {
        type: Sequelize.FLOAT
      },
      landingCostMultiple: {
        type: Sequelize.FLOAT
      },
      purchaseUOM: {
        type: Sequelize.STRING
      },
      box: {
        type: Sequelize.STRING
      },
      safetyStock: {
        type: Sequelize.FLOAT
      },
      reorderQty: {
        type: Sequelize.FLOAT
      },
      leadTime: {
        type: Sequelize.INTEGER
      },
      defaultSupplier: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PurchaseItemDetails');
  }
};