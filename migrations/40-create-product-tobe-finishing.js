'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductsTobeFinishing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PrdOrdId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ProductionOrders",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"ItemMasters",
          key:"id"
        },
        onDelete:'CASCADE',
        onUpdate:"CASCADE"
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      uom: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      BomId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model:"BillOfMaterials",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valuationFactor: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      remarks: {
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
    await queryInterface.dropTable('ProductsTobeFinishing');
  }
};