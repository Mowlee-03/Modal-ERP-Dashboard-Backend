'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerSupplierDetails', {
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
      payableAccount: {
        type: Sequelize.STRING,
        allowNull:true
      },
      purchaseCreditPeriod: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      purchasePriceList: {
        type: Sequelize.STRING,
        allowNull:true
      },
      purchasePaymentTerms: {
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
    await queryInterface.dropTable('CustomerSupplierDetails');
  }
};