'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PartnerGeneralDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partnerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Partners",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      legalName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      territoryId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Territories",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
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
    await queryInterface.dropTable('PartnerGeneralDetails');
  }
};