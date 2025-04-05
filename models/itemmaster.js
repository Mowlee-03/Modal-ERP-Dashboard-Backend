'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemMaster extends Model {
    static associate(models) {
      // One ItemMaster can have multiple Sales Kits
      ItemMaster.hasMany(models.SalesItemKit, {foreignKey: 'parentItemId',as: 'salesKits',onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      // One ItemMaster can also be part of a Sales Kit (as a child)
      ItemMaster.hasMany(models.SalesItemKit, {foreignKey: 'childItemId',as: 'kitComponents',onDelete: 'CASCADE',onUpdate: 'CASCADE'});

      ItemMaster.hasOne(models.ItemAccountDetails, {foreignKey: 'itemId',as: 'accountDetails',onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      ItemMaster.hasOne(models.ItemSettings,{foreignKey:"itemId",as:"settings",onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      ItemMaster.hasOne(models.PurchaseItemDetails,{foreignKey:"itemId",as:"purchaseDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.hasOne(models.SalesItemDetails,{foreignKey:"itemId",as:"salesDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.hasOne(models.ItemServiceDetails,{foreignKey:"itemId",as:"serviceDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.belongsTo(models.ItemGroup, {foreignKey: 'groupId',as: 'group',onDelete: 'SET NULL',onUpdate: 'CASCADE'});
      ItemMaster.belongsTo(models.ItemCategory,{foreignKey:"categoryId",as:"category",onDelete:"SET NULL",onUpdate:"CASCADE"});
      ItemMaster.hasMany(models.SalesOrderItem,{foreignKey:"itemId",as:"salesOrderItems",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.hasMany(models.ProductTobeFinish,{foreignKey:"itemId",as:"productTobeFinish",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.hasMany(models.ProdRawMatDetail,{foreignKey:"itemId",as:"prodRawMatDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  ItemMaster.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    itemType: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    baseUOM: DataTypes.STRING,
    barCode: DataTypes.STRING,
    partCode: DataTypes.STRING,
    warranty: DataTypes.STRING,
    componentLocation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ItemMaster',
  });
  return ItemMaster;
};