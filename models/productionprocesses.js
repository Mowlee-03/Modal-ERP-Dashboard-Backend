'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionProcesses extends Model {

    static associate(models) {
      ProductionProcesses.hasMany(models.RoutingProcessDetails,{foreignKey:"processId",as:"routingsProcessDetails",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  ProductionProcesses.init({
    name: DataTypes.STRING,
    displayOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductionProcesses',
  });
  return ProductionProcesses;
};