'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pricelists extends Model {
    static associate(models) {
      pricelists.hasMany(models.SoBillingDetails,{foreignKey:"priceListId",as:"SoBillings",onDelete:"CASCADE",onUpdate:"CASCADE"});
      pricelists.belongsTo(models.Currency,{foreignKey:"currencyId",as:"currency",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  pricelists.init({
    name: DataTypes.STRING,
    currencyId:DataTypes.INTEGER,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pricelists',
    hooks:{
      afterCreate:async (pricelist,options) => {
        const {ActivityLogs}=require("../models")
        await ActivityLogs.create({
          userId:options.userId,
          executedBy: options.userId,
          action:"Pricelist Added",
          tableName:"Pricelist",
          details:[{
            message:`${pricelist.name}:pricelist addedd by ${options.username}`
          }],
          ipAddress: options.ipAddress || "Unknown",
          userAgent: options.userAgent || "Unknown",
        })


      }
    }
  });
  return pricelists;
};