'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkCenters extends Model {

    static associate(models) {
      WorkCenters.hasMany(models.RoutingProcessDetails,{foreignKey:"workcenterId",as:"routingProcessDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      WorkCenters.hasMany(models.ProductionProcessDetail,{foreignKey:"workcenterId",as:"productionProcessDetails",onDelete:'CASCADE',onUpdate:"CASCADE"});
    }
  }
  WorkCenters.init({
    name: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    hourlyCost: DataTypes.DECIMAL,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'WorkCenters',
  });
  return WorkCenters;
};