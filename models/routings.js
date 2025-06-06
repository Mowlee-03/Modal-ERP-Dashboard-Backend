'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Routings extends Model {
    static associate(models) {
      Routings.hasMany(models.RoutingProcessDetails,{foreignKey:"routingId",as:"processDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Routings.hasMany(models.ProductionOrder,{foreignKey:"routingId",as:"productionOrderS",onUpdate:"CASCADE",onDelete:"CASCADE"})
    }
  }
  Routings.init({
    name: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Routings',
  });
  return Routings;
};