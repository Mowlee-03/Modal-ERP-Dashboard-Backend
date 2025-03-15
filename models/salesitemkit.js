'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesItemKit extends Model {
    static associate(models) {
      // Parent Item (Main Item)
      SalesItemKit.belongsTo(models.ItemMaster, {
        foreignKey: 'parentItemId',
        as: 'parentItem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Child Item (Kit Item selected from existing items)
      SalesItemKit.belongsTo(models.ItemMaster, {
        foreignKey: 'childItemId',
        as: 'childItem',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  SalesItemKit.init({
    parentItemId: DataTypes.INTEGER, // Main Item
    childItemId: DataTypes.INTEGER,  // Child Item (Selected from ItemMaster)
    quantity: DataTypes.INTEGER,
    uom: DataTypes.STRING,
    costRatio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalesItemKit',
  });

  return SalesItemKit;
};
