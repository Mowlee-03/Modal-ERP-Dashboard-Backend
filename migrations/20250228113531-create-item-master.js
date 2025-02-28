'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      itemType: {
        type: Sequelize.STRING
      },
      product: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      group: {
        type: Sequelize.STRING
      },
      baseUOM: {
        type: Sequelize.STRING
      },
      barCode: {
        type: Sequelize.STRING
      },
      partCode: {
        type: Sequelize.STRING
      },
      warranty: {
        type: Sequelize.INTEGER
      },
      componentLocation: {
        type: Sequelize.STRING
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
      enableSerialNumber: {
        type: Sequelize.BOOLEAN
      },
      enableBatch: {
        type: Sequelize.BOOLEAN
      },
      enableSalesKit: {
        type: Sequelize.BOOLEAN
      },
      useBillingUOM: {
        type: Sequelize.BOOLEAN
      },
      allowBackOrder: {
        type: Sequelize.BOOLEAN
      },
      recommendedSellingPrice: {
        type: Sequelize.FLOAT
      },
      minimumSellingPrice: {
        type: Sequelize.FLOAT
      },
      salesUOM: {
        type: Sequelize.STRING
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
      serviceableEquipment: {
        type: Sequelize.STRING
      },
      hsnCode: {
        type: Sequelize.STRING
      },
      salesTax: {
        type: Sequelize.STRING
      },
      purchaseTax: {
        type: Sequelize.STRING
      },
      salesAccount: {
        type: Sequelize.STRING
      },
      purchaseAccount: {
        type: Sequelize.STRING
      },
      tariffCode: {
        type: Sequelize.STRING
      },
      commodityCode: {
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
    await queryInterface.dropTable('ItemMasters');
  }
};