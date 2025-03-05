'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Territory extends Model {
 
    static associate(models) {
      Territory.hasMany(models.SalesOrder,{foreignKey:"territoryId",as:"SalesOrders",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Territory.hasMany(models.Territory,{foreignKey:"parentId",as:"childTerritory", onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      Territory.belongsTo(models.Territory,{foreignKey:"parentId",as:"parentTerritory",onDelete:"SET NULL",onUpdate:"CASCADE"});
    }
  }
  Territory.init({
    name: DataTypes.STRING,
    isParent: DataTypes.BOOLEAN,
    parentId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Territory',
    hooks:{
      afterCreate:async (territory,options) => {
        const {ActivityLogs}=require("../models")
        await ActivityLogs.create({
          userId:options.userId,
          executedBy: options.userId,
          action:"Territory Created",
          tableName:"Territory",
          details:[{
            message:`${territory.name}:territory created by ${options.username}`
          }],
          ipAddress: options.ipAddress || "Unknown",
          userAgent: options.userAgent || "Unknown",
        })
      }
    }
  });
  return Territory;
};