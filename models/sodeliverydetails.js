'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoDeliveryDetails extends Model {
    static associate(models) {
      SoDeliveryDetails.belongsTo(models.SalesOrder,{foreignKey:"salesOrderId",as:"salesOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SoDeliveryDetails.belongsTo(models.Warehouses,{foreignKey:"warehosueId",as:"warehouse",onDelete:"SET NULL",onUpdate:"CASCADE"});    
    }
  }
  SoDeliveryDetails.init({
    salesOrderId: DataTypes.INTEGER,
    deliveryPolicy: DataTypes.STRING,
    deliveryDate: DataTypes.DATE,
    warehouseId: DataTypes.INTEGER,
    consignee: DataTypes.STRING,
    modeOfDispatch: DataTypes.STRING,
    deliveryContact: DataTypes.STRING,
    deliveryAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SoDeliveryDetails',
  });
  return SoDeliveryDetails;
};