'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoutingProcessDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routingId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Routings",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      processId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ProductionProcesses",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      workcenterId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"WorkCenters",
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      setupTime: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      processTime: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('RoutingProcessDetails');
  }
};