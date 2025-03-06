'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesItemDetails', {
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
      recommendedSellingPrice: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      minimumSellingPrice: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      salesUOM: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('SalesItemDetails');
  }
};