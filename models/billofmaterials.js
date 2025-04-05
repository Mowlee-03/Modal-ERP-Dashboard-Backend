'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillOfMaterials extends Model {

    static associate(models) {
      BillOfMaterials.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"item",onDelete:"CASCADE",onUpdate:"CASCADE"});
      BillOfMaterials.hasMany(models.BomComponentDetails,{foreignKey:"BomId",as:"componentsDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      BillOfMaterials.hasMany(models.ProductTobeFinish,{foreignKey:'BomId',as:"productsTobeFinishing",onUpdate:"CASCADE",onDelete:"CASCADE"});
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