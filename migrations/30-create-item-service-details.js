'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemServiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"ItemMasters",
          key:"id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      serviceableEquipment: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      enableSpareWarranty: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      warrantyDuration: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      installationApplicable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      warrantyApplicable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      defaultWarrantyContract: {
        type: Sequelize.STRING,
        allowNull:true
      },
      warrantyBasedOn: {
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
    await queryInterface.dropTable('ItemServiceDetails');
  }
};