'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    static associate(models) {
      SalesOrder.hasOne(models.SoBillingDetails,{foreignKey:"salesOrderId",as:"billingDetail",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SalesOrder.hasOne(models.SoDeliveryDetails,{foreignKey:"salesOrderId",as:"deleiveryDetail",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SalesOrder.hasMany(models.SalesOrderItem,{foreignKey:"salesOrderId",as:"items",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  SalesOrder.init({
    soId:DataTypes.STRING,
    orderDate: DataTypes.DATE,

    quoteId: DataTypes.INTEGER,

    customerId: DataTypes.INTEGER,

    customerPoNumber: DataTypes.STRING,
    customerPoDate: DataTypes.DATE,
    salesPerson: DataTypes.STRING,
    territory: DataTypes.STRING,
    remarks:DataTypes.TEXT,

    totalAmount:DataTypes.FLOAT,
    amountWithTax:DataTypes.FLOAT,
    roundOffMethod:DataTypes.STRING,
    roundOffValue:DataTypes.FLOAT,
    finalAmountDollar:DataTypes.FLOAT,
    finalAmountInr:DataTypes.FLOAT,

    termsAndConditions:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalesOrder',
  });
  return SalesOrder;
};