'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupplierDetails extends Model {
   
    static associate(models) {
      SupplierDetails.belongsTo(models.Partner,{foreignKey:"supplierId",as:"supplier",onDelete:"CASCADE",onUpdate:"CASCADE"})
      SupplierDetails.belongsTo(models.pricelists,{foreignKey:"purchasePriceListId",as:"purchasePriceList",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  SupplierDetails.init({
    supplierId: DataTypes.INTEGER,
    payableAccount: DataTypes.STRING,
    purchaseCreditPeriod: DataTypes.INTEGER,
    purchasePriceListId: DataTypes.INTEGER,
    purchasePaymentTerms: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SupplierDetails',
  });
  return SupplierDetails;
};