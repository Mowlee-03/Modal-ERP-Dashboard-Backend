'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
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
          model:"CustomerGroups",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      pricelistId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"pricelists",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      creditLimit: {
        type: Sequelize.DECIMAL,
        allowNull:true
      },
      creditPeriod: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      receivableAccount: {
        type: Sequelize.STRING,
        allowNull:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      skipCreditLimitException: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('CustomerGroups');
  }
};