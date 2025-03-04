'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActivityLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Foreign key reference to User table
          key: "id",
        },
        onUpdate: 'CASCADE'
      },
      executedBy: {
        type: Sequelize.INTEGER, // Stores who performed the action
        allowNull: false,
        references: {
          model: "Users", // Foreign key reference to User table
          key: "id",
        },
        onUpdate: 'CASCADE'
      },
      action: {
        type: Sequelize.STRING,
        allowNull:false
      },
      tableName: {
        type: Sequelize.STRING,
        allowNull:true
      },
      details: {
        type: Sequelize.JSON,
        allowNull:false

      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull:true
      },
      userAgent: {
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
    await queryInterface.dropTable('ActivityLogs');
  }
};