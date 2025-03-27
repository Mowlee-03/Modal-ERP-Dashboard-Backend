'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouses extends Model {
    static associate(models) {
      Warehouses.hasMany(models.SoDeliveryDetails,{foreignKey:"warehouseId",as:"SoDeliveryDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});

    }
  }
  Warehouses.init({
    name: DataTypes.STRING,
    isActive:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Warehouses',
  });
  return Warehouses;
};