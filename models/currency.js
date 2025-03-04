'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {

    static associate(models) {
      Currency.hasMany(models.SoBillingDetails,{foreignKey:"currencyId",as:"SoBillings",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Currency.hasMany(models.pricelists,{foreignKey:"currencyId",as:"pricelists",onDelete:"CASCADE",onUpdate:"CASCADE"});
      
    }
  }
  Currency.init({
    name: DataTypes.STRING,
    exchangeRate: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};