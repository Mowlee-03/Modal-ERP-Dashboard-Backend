'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoutingProcessDetails extends Model {

    static associate(models) {
      RoutingProcessDetails.belongsTo(models.ProductionProcesses,{foreignKey:"processId",as:"process",onDelete:"CASCADE",onUpdate:"CASCADE"})
      RoutingProcessDetails.belongsTo(models.WorkCenters,{foreignKey:"workcenterId",as:"workcenter",onDelete:"CASCADE",onUpdate:"CASCADE"})
      RoutingProcessDetails.belongsTo(models.Routings,{foreignKey:"routingId",as:"routing",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  RoutingProcessDetails.init({
    routingId: DataTypes.INTEGER,
    processId: DataTypes.INTEGER,
    workcenterId: DataTypes.INTEGER,
    setupTime: DataTypes.INTEGER,
    processTime: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoutingProcessDetails',
  });
  return RoutingProcessDetails;
};