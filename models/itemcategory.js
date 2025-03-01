'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCategory extends Model {

    static associate(models) {
      ItemCategory.hasMany(models.ItemMaster,{foreignKey:"categoryId",as:"items",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  ItemCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemCategory',
  });
  return ItemCategory;
};