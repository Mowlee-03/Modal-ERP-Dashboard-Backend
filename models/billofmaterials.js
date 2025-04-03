'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillOfMaterials extends Model {

    static associate(models) {
      
    }
  }
  BillOfMaterials.init({
    BomName: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    remarks: DataTypes.TEXT,
    isDefault: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BillOfMaterials',
  });
  return BillOfMaterials;
};