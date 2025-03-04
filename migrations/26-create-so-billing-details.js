'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SoBillingDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salesOrderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"SalesOrders",
          key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      currencyId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Currencies",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      currencyExchangeRate:{
        type:Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      priceListId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"pricelists",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      paymentTerms:{
        type:Sequelize.STRING,
        allowNull:true
      },
      creditPeriod:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      frieghtName:{
        type:Sequelize.STRING,
        allowNull:true
      },
      defaultTax:{
        type:Sequelize.JSON,
        allowNull:true
      },
      billingContact:{
        type:Sequelize.STRING,
        allowNull:true
      },
      billingAddress:{
        type:Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('SoBillingDetails');
  }
};