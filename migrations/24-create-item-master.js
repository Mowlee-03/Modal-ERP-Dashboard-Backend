'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemMasters', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      itemType: {
        type: Sequelize.STRING,
        allowNull:false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"ItemCategories",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"ItemGroups",
          key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"SET NULL"
      },
      baseUOM: {
        type: Sequelize.STRING,
        allowNull:false
      },
      barCode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      partCode: {
        type: Sequelize.STRING,
        allowNull:true
      },
      warranty: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      componentLocation: {
        type: Sequelize.STRING,
        allowNull:true
      },
      serviceableEquipment: {
        type: Sequelize.STRING,
        allowNull:true
      },
      spareWarranty:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      warrantyDuration:{
        type:Sequelize.INTEGER,
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
    await queryInterface.dropTable('ItemMasters');
  }
};