'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {

    static associate(models) {
      Partner.hasMany(models.SalesOrder,{foreignKey:"customerId",as:"SalesOrder",onDelete:"CASCADE",onUpdate:"CASCADE"})
      Partner.hasMany(models.Contact,{foreignKey:"partnerId",as:"contactDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasOne(models.PartnerGeneralDetails,{foreignKey:"partnerId",as:"generalDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasOne(models.PartnerLegalDetails,{foreignKey:"partnerId",as:"legalDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasOne(models.CustomerDetails,{foreignKey:"customerId",as:"customerDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasOne(models.SupplierDetails,{foreignKey:"supplierId",as:"supplierDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasMany(models.PurchaseItemDetails,{foreignKey:"supplierId",as:"purchaseItems",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Partner.hasMany(models.ProductionOrder,{foreignKey:'customerId',as:"productionOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
      
    }
  }
  Partner.init({
    name: DataTypes.STRING,
    isCompany: DataTypes.BOOLEAN,
    customer: DataTypes.BOOLEAN,
    supplier: DataTypes.BOOLEAN,
    competitor: DataTypes.BOOLEAN,
    transporter: DataTypes.BOOLEAN,
    transporterId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partner',
  });
  return Partner;
};