'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      isParent: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      parentGroupId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"ItemGroups",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      salesTax: {
        type: Sequelize.JSON,
        allowNull:true
      },
      purchaseTax: {
        type: Sequelize.JSON,
        allowNull:true
      },
      incomeAccount: {
        type: Sequelize.STRING,
        allowNull:true
      },
      expenseAccount: {
        type: Sequelize.STRING,
        allowNull:true
      },
      hsnSacCode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
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
    await queryInterface.dropTable('ItemGroups');
  }
};