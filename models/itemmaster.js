'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemMaster extends Model {
    static associate(models) {
      ItemMaster.hasOne(models.ItemAccountDetails, {foreignKey: 'itemId',as: 'accountDetails',onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      ItemMaster.hasOne(models.ItemSettings,{foreignKey:"itemId",as:"settings",onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      ItemMaster.hasOne(models.PurchaseItemDetails,{foreignKey:"itemId",as:"purchaseDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.hasOne(models.SalesItemDetails,{foreignKey:"itemId",as:"salesDetails",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ItemMaster.belongsTo(models.ItemGroup, {foreignKey: 'groupId',as: 'group',onDelete: 'SET NULL',onUpdate: 'CASCADE'});
      ItemMaster.belongsTo(models.ItemCategory,{foreignKey:"categoryId",as:"category",onDelete:"SET NULL",onUpdate:"CASCADE"})
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
    warranty: DataTypes.INTEGER,
    componentLocation: DataTypes.STRING,

    serviceableEquipment: DataTypes.STRING,
    spareWarranty:DataTypes.BOOLEAN,
    warrantyDuration:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ItemMaster',
  });
  return ItemMaster;
};