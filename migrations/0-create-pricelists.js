'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pricelists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      currencyId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Currencies',
          key:"id"
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      isActive: {
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
    await queryInterface.dropTable('pricelists');
  }
};