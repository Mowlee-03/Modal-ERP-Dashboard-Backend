'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parteners', {
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
      isCompany: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      customer: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      supplier: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      competitor: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      transporter: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      transporterId: {
        type: Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('Parteners');
  }
};