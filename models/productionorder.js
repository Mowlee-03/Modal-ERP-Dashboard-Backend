'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionOrder extends Model {

    static associate(models) {
      
    }
  }
  ProductionOrder.init({
    PrdOrdNo: DataTypes.STRING,
    orderType: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    customerId: DataTypes.INTEGER,
    salesOrderId: DataTypes.INTEGER,
    materialWarehouseId: DataTypes.INTEGER,
    FGwarehouseId: DataTypes.INTEGER,
    remarks: DataTypes.TEXT,
    routingId:DataTypes.INTEGER,
    plannedStartDate:DataTypes.DATE,
    plannedEndDate:DataTypes.DATE,
    actualStartDate:DataTypes.DATE,
    actualEndDate:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ProductionOrder',
  });
  return ProductionOrder;
};