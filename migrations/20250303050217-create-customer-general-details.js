'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerGeneralDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Customers",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      legalName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      territory: {
        type: Sequelize.STRING,
        allowNull:true
      },
      website: {
        type: Sequelize.STRING,
        allowNull:true
      },
      industry: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CustomerGeneralDetails');
  }
};