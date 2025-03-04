'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SoDeliveryDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salesOrderId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"SalesOrders",
          key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      deliveryPolicy:{
        type:Sequelize.STRING,//like after order,after payment
        allowNull:false
      },
      deliveryDate:{
        type:Sequelize.DATE,
        allowNull:false
      },
      warehouseId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:"Warehouses",
          key:"id"
        },
        onDelete:"SET NULL",
        onUpdate:"CASCADE"
      },
      consignee:{
        type:Sequelize.STRING,
        allowNull:true
      },
      modeOfDispatch:{
        type:Sequelize.STRING,
        allowNull:true
      },
      deliveryContact:{
        type:Sequelize.STRING,
        allowNull:true
      },
      deliveryAddress:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('SoDeliveryDetails');
  }
};