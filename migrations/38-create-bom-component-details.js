'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BomComponentDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BomId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"BillOfMaterials",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ItemMasters",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      quantity: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      uom: {
        type: Sequelize.STRING,
        allowNull:false
      },
      locationRemarks: {
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
    await queryInterface.dropTable('BomComponentDetails');
  }
};