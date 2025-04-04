'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductionProcessDetail extends Model {
    static associate(models) {
      
    }
  }
  ProductionProcessDetail.init({
    PrdOrdId: DataTypes.INTEGER,
    processId: DataTypes.INTEGER,
    workcenterId: DataTypes.INTEGER,
    operatorName: DataTypes.STRING,
    plannedStartTime: DataTypes.DATE,
    plannedEndTime: DataTypes.DATE,
    actualStartTime: DataTypes.DATE,
    actualEndTime: DataTypes.DATE,
    plannedDuration: DataTypes.FLOAT,
    actualDuration: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProductionProcessDetail',
  });
  return ProductionProcessDetail;
};