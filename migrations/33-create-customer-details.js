'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerDetails', {
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
          model:"Parteners",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      customerGroupId: {
        type: Sequelize.INTEGER,
        references:{
          model:"CustomerGroups",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      salesPerson: {
        type: Sequelize.STRING,
        allowNull:true
      },
      collectionPerson: {
        type: Sequelize.STRING
      },
      priceList: {
        type: Sequelize.STRING
      },
      creditPeriod: {
        type: Sequelize.INTEGER
      },
      creditLimit: {
        type: Sequelize.DECIMAL
      },
      receivableAccount: {
        type: Sequelize.STRING
      },
      paymentTerms: {
        type: Sequelize.STRING
      },
      modeOfDispatch: {
        type: Sequelize.STRING
      },
      freight: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('CustomerDetails');
  }
};