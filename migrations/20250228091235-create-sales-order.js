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
        allowNull:false
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
      territory: {
        type: Sequelize.STRING,
        allowNull:true
      },
      remarks:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      
      deliveryPolicy:{
        type:Sequelize.STRING,
        allowNull:false
      },
      deliveryDate:{
        type:Sequelize.DATE,
        allowNull:false
      },
      warehouse:{
        type:Sequelize.STRING,
        allowNull:true
      },
      consignee:{
        type:Sequelize.STRING,
        allowNull:true
      },
      modeOfDispatch:{
        type:Sequelize.STRING,
        allowNull:true
      },
      deliveryContact:{
        type:Sequelize.STRING,
        allowNull:true
      },
      deliveryAddress:{
        type:Sequelize.STRING,
        allowNull:false
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
          type: Sequelize.STRING,
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