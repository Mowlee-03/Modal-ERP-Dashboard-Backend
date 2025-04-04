'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTobeFinish extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  ProductTobeFinish.init({
    PrdOrdId:DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT,
    uom: DataTypes.STRING,
    BomId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    valuationFactor: DataTypes.FLOAT,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductTobeFinish',
  });
  return ProductTobeFinish;
};