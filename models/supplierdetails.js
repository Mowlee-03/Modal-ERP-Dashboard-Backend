'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupplierDetails extends Model {
   
    static associate(models) {
      SupplierDetails.belongsTo(models.Partner,{foreignKey:"supplierId",as:"supplier",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  SupplierDetails.init({
    supplierId: DataTypes.INTEGER,
    payableAccount: DataTypes.STRING,
    purchaseCreditPeriod: DataTypes.INTEGER,
    purchasePriceList: DataTypes.STRING,
    purchasePaymentTerms: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SupplierDetails',
  });
  return SupplierDetails;
};