'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemGroup.belongsTo(models.ItemGroup, {
        foreignKey: 'parentGroupId',
        as: 'parentGroup',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });

      ItemGroup.hasMany(models.ItemGroup, {
        foreignKey: 'parentGroupId',
        as: 'childGroups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Association with ItemMaster (Each Item belongs to a Group)
      ItemGroup.hasMany(models.ItemMaster, {
        foreignKey: 'groupId',
        as: 'items',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }
  ItemGroup.init({
    groupName: DataTypes.STRING,
    isParent: DataTypes.BOOLEAN,
    parentGroupId: DataTypes.INTEGER,
    salesTax: DataTypes.STRING,
    purchaseTax: DataTypes.STRING,
    incomeAccount: DataTypes.STRING,
    expenseAccount: DataTypes.STRING,
    hsnSacCode: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ItemGroup',
  });
  return ItemGroup;
};