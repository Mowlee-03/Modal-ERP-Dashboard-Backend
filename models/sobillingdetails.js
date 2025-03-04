'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoBillingDetails extends Model {

    static associate(models) {
      SoBillingDetails.belongsTo(models.SalesOrder,{foreignKey:"salesOrderId",as:"salesOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SoBillingDetails.belongsTo(models.Currency,{foreignKey:"currencyId",as:"currency",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SoBillingDetails.belongsTo(models.pricelists,{foreignKey:"priceListId",as:"pricelist",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  SoBillingDetails.init({
    salesOrderId: DataTypes.INTEGER,
    currencyId: DataTypes.INTEGER,
    priceListId: DataTypes.INTEGER,
    paymentTerms: DataTypes.STRING,
    creditPeriod: DataTypes.INTEGER,
    frieghtName: DataTypes.STRING,
    defaultTax: DataTypes.JSON,
    billingContact: DataTypes.STRING,
    billingAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SoBillingDetails',
  });
  return SoBillingDetails;
};