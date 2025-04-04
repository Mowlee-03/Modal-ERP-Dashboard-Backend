'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductionProcessDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PrdOrdId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ProductionOrders",
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
          key:"id",
        },
        onUpdate:"CASCADE"
      },
      workcenterId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"WorkCenters",
          key:"id"
        },
        onUpdate:"CASCADE"
      },
      operatorName: {
        type: Sequelize.STRING,
        allowNull:true
      },
      plannedStartTime: {
        type: Sequelize.DATE,
        allowNull:true
      },
      plannedEndTime: {
        type: Sequelize.DATE,
        allowNull:true
      },
      actualStartTime: {
        type: Sequelize.DATE,
        allowNull:true
      },
      actualEndTime: {
        type: Sequelize.DATE,
        allowNull:true
      },
      plannedDuration: {
        type: Sequelize.FLOAT,
        allowNull:true
      },
      actualDuration: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('ProductionProcessDetails');
  }
};