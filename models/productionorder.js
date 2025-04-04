'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionOrder extends Model {

    static associate(models) {
      ProductionOrder.belongsTo(models.Partner,{foreignKey:"customerId",as:"customer",onDelete:'SET NULL',onUpdate:"CASCADE"});
      ProductionOrder.belongsTo(models.SalesOrder,{foreignKey:"salesOrderId",as:"salesOrder",onDelete:"SET NULL",onUpdate:"CASCADE"});
      ProductionOrder.belongsTo(models.Warehouses,{foreignKey:"materialWarehouseId",as:"materialWarehouse",onUpdate:"CASCADE"});
      ProductionOrder.belongsTo(models.Warehouses,{foreignKey:"FGwarehouseId",as:"FGwarehouse",onUpdate:"CASCADE"});
      ProductionOrder.belongsTo(models.Routings,{foreignKey:"routingId",as:"routing",onDelete:"SET NULL",onUpdate:"CASCADE"});
      ProductionOrder.hasMany(models.ProductTobeFinish,{foreignKey:"PrdOrdId",as:"productsTobeFinishing",onDelete:"CASCADE",onUpdate:"CASCADE"});
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
    
    //Scheduling Details
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