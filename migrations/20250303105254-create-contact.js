'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true
      },
      designation: {
        type: Sequelize.STRING,
        allowNull:true
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
      email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:true
      },
      fax: {
        type: Sequelize.STRING,
        allowNull:true
      },
      salesPerson: {
        type: Sequelize.STRING,
        allowNull:true
      },
      primaryContact: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      source: {
        type: Sequelize.STRING,
        allowNull:true
      },
      territory: {
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
    await queryInterface.dropTable('Contacts');
  }
};


