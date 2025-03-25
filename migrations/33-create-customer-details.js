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
          model:"Partners",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      customerGroupId: {
        type: Sequelize.INTEGER,
        allowNull:true,
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
        type: Sequelize.STRING,
        allowNull:true
      },
      priceListId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"pricelists",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      creditPeriod: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      creditLimit: {
        type: Sequelize.DECIMAL,
        allowNull:true
      },
      receivableAccount: {
        type: Sequelize.STRING,
        allowNull:true
      },
      paymentTerms: {
        type: Sequelize.STRING,
        allowNull:true
      },
      modeOfDispatch: {
        type: Sequelize.STRING,
        allowNull:true
      },
      freight: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('CustomerDetails');
  }
};