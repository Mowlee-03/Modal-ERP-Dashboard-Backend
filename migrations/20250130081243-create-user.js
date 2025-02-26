'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Roles",  // ✅ Ensure this matches migration table name
          key: "id",
        },
        onDelete: "CASCADE",  // ✅ Ensure referential integrity
        onUpdate: "CASCADE"
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"Departments",
          key:"id",
        },
        onDelete: "CASCADE",  // ✅ Ensure referential integrity
        onUpdate: "CASCADE"
      },
      last_login:{
        type:Sequelize.DATE,
        allowNull:true
      },
      is_Active: {
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
    await queryInterface.dropTable('Users');
  }
};