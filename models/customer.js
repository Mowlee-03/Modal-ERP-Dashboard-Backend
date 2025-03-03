'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {

    static associate(models) {
      Customer.hasMany(models.Contact,{foreignKey:"customerId",as:"contactDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Customer.hasOne(models.CustomerGeneralDetails,{foreignKey:"customerId",as:"generalDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Customer.hasOne(models.CustomerLegalDetails,{foreignKey:"customerId",as:"legalDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Customer.hasOne(models.CustomerDetails,{foreignKey:"customerId",as:"details",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Customer.hasOne(models.CustomerSupplierDetails,{foreignKey:"customerId",as:"supplierDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    isCompany: DataTypes.BOOLEAN,
    customer: DataTypes.BOOLEAN,
    supplier: DataTypes.BOOLEAN,
    competitor: DataTypes.BOOLEAN,
    transporter: DataTypes.BOOLEAN,
    transporterId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};