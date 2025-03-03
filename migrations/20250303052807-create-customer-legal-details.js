'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CustomerLegalDetails', {
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
      gstRegistrationType: {
        type: Sequelize.STRING,
        allowNull:true
      },
      gstin: {
        type: Sequelize.STRING,
        allowNull:true
      },
      panNo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      tanNo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      cinNo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      supplierCode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      msmeRegType: {
        type: Sequelize.STRING,
        allowNull:true
      },
      udayamRegNo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      msmeRegisteredDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('CustomerLegalDetails');
  }
};