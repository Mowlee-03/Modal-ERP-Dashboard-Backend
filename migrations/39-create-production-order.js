'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductionOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PrdOrdNo: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      orderType: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Partners",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      salesOrderId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"SalesOrders",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      materialWarehouseId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Warehouses",
          key:"id"
        },
        onUpdate:"CASCADE"
      },
      FGwarehouseId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Warehouses",
          key:"id"
        },
        onUpdate:"CASCADE"
      },
      routingId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Routings",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      plannedStartDate:{
        type:Sequelize.DATE,
        allowNull:false
      },
      plannedEndDate:{
        type:Sequelize.DATE,
        allowNull:true
      },
      actualStartDate:{
        type:Sequelize.DATE,
        allowNull:true
      },
      actualEndDate:{
        type:Sequelize.DATE,
        allowNull:true
      },
      remarks: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('ProductionOrders');
  }
};