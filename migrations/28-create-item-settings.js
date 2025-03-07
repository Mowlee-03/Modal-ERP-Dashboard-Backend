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
          model:"ItemMasters",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      trackStock: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      salesItem: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      purchaseItem: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      productionItem: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      bomType: {
        type: Sequelize.STRING,
        allowNull:true
      },
      defaultRouting: {
        type: Sequelize.STRING,
        allowNull:true
      },
      enableSerialNumber: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      autoGenerateSerialNo: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      serialNoFormat: {
        type: Sequelize.STRING,
        allowNull:true
      },
      serialNoCurrentValue: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      enableBatch: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      enableSalesKit: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      useBillingUOM: {
        type: Sequelize.STRING,
        allowNull:true
      },
      billingUOM: {
        type: Sequelize.STRING,
        allowNull:true
      },
      allowBackOrder: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      useForCasualLabour:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      useForInternalLabour:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      activityType:{
        type:Sequelize.STRING,
        allowNull:true
      },
      useForOandM:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
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