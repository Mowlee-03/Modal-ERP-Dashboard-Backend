'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SupplierDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Partners",
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
      purchasePriceListId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"pricelists",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
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
    await queryInterface.dropTable('SupplierDetails');
  }
};