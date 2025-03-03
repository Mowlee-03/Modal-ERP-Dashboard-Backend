'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemAccountDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model:"ItemMasters",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      hsnCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salesTax: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      purchaseTax: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      salesAccount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      purchaseAccount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tariffCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      commodityCode: {
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
    await queryInterface.dropTable('ItemAccountDetails');
  }
};