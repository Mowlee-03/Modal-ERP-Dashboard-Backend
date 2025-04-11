'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTobeFinish extends Model {
    
    static associate(models) {
      ProductTobeFinish.belongsTo(models.ProductionOrder,{foreignKey:"PrdOrdId",as:"productionOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ProductTobeFinish.belongsTo(models.ItemMaster,{foreignKey:'itemId',as:"item",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ProductTobeFinish.belongsTo(models.BillOfMaterials,{foreignKey:"BomId",as:"BillofMaterials",onDelete:'SET NULL',onUpdate:"CASCADE"});
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
    tableName:"ProductsTobeFinishing",
  });
  return ProductTobeFinish;
};