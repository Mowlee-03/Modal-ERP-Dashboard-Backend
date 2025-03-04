'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Contacts",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      addressType: {
        type: Sequelize.STRING,
        allowNull:true
      },
      firstLine: {
        type: Sequelize.STRING,
        allowNull:true
      },
      secondLine: {
        type: Sequelize.STRING,
        allowNull:true
      },
      city: {
        type: Sequelize.STRING,
        allowNull:true
      },
      state: {
        type: Sequelize.STRING,
        allowNull:true
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      country: {
        type: Sequelize.STRING,
        allowNull:true
      },
      displayAddress: {
        type: Sequelize.STRING,
        allowNull:true
      },
      gstin: {
        type: Sequelize.STRING,
        allowNull:true
      },
      territory: {
        type: Sequelize.STRING,
        allowNull:true
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('Addresses');
  }
};