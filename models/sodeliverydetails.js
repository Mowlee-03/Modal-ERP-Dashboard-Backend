'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoDeliveryDetails extends Model {
    static associate(models) {
      SoDeliveryDetails.belongsTo(models.SalesOrder,{foreignKey:"salesOrderId",as:"salesOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  SoDeliveryDetails.init({
    salesOrderId: DataTypes.INTEGER,
    deliveryPolicy: DataTypes.STRING,
    deliveryDate: DataTypes.DATE,
    warehouse: DataTypes.STRING,
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