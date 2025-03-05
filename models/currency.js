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
    hooks:{
      afterCreate:async (currency,options) => {
        const {ActivityLogs}=require("../models")

        await ActivityLogs.create({
          userId:options.userId,
          executedBy: options.userId,
          action:"Currency Created",
          tableName:"Currency",
          details:[{
            message:`${currency.name}:Currency Created by ${options.username}`
          }],
          ipAddress: options.ipAddress || "Unknown",
          userAgent: options.userAgent || "Unknown",
        })



      }
    }
  });
  return Currency;
};