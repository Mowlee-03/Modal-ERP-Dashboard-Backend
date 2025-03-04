'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      soId:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Parteners",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      quoteId: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      customerPoNumber: {
        type: Sequelize.STRING
      },
      customerPoDate: {
        type: Sequelize.DATE,
      },
      salesPerson: {
        type: Sequelize.STRING,
        allowNull:true
      },
      territoryId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Territories",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      remarks:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      additionalCharges:{
        type:Sequelize.JSON,
        allowNull:true
      },
      totalAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      amountWithTax: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
      },
      roundOffMethod: {
          type: Sequelize.STRING,
          defaultValue: 'Even',
      },
      roundOffValue: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
      },
      finalAmountDollar:{
        type:Sequelize.FLOAT,
        defaultValue:0.0,
      },
      finalAmountInr: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
      },
      termsAndConditions: {
          type: Sequelize.TEXT,
          allowNull: true,
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
    await queryInterface.dropTable('SalesOrders');
  }
};