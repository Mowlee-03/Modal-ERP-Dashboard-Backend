'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BomComponentDetails extends Model {
    static associate(models) {
      BomComponentDetails.belongsTo(models.BillOfMaterials,{foreignKey:"BomId",as:"Bom",onDelete:"CASCADE",onUpdate:"CASCADE"});
      BomComponentDetails.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"component",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  BomComponentDetails.init({
    BomId:DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    quantity: DataTypes.DECIMAL,
    uom: DataTypes.STRING,
    locationRemarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BomComponentDetails',
  });
  return BomComponentDetails;
};