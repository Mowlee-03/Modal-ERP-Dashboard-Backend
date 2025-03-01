'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemSettings', {
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
      trackStock: {
        type: Sequelize.BOOLEAN
      },
      salesItem: {
        type: Sequelize.BOOLEAN
      },
      purchaseItem: {
        type: Sequelize.BOOLEAN
      },
      productionItem: {
        type: Sequelize.BOOLEAN
      },
      bomType: {
        type: Sequelize.STRING
      },
      defaultRouting: {
        type: Sequelize.STRING
      },
      enableSerialNumber: {
        type: Sequelize.BOOLEAN
      },
      autoGenerateSerialNo: {
        type: Sequelize.BOOLEAN
      },
      serialNoFormat: {
        type: Sequelize.STRING
      },
      serialNoCurrentValue: {
        type: Sequelize.INTEGER
      },
      enableBatch: {
        type: Sequelize.BOOLEAN
      },
      enableSalesKit: {
        type: Sequelize.BOOLEAN
      },
      useBillingUOM: {
        type: Sequelize.STRING
      },
      billingUOM: {
        type: Sequelize.STRING
      },
      allowBackOrder: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('ItemSettings');
  }
};