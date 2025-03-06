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
          model:"ItemMasters",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      defaultPurchaseCost: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      landingCostMultiple: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      purchaseUOM: {
        type: Sequelize.STRING,
        allowNull:false
      },
      safetyStock: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      reorderQty: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      leadTime: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Partners",
          key:"id"
        },
        onDeleteL:"SET NULL",
        onUpdate:"CASCADE"
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