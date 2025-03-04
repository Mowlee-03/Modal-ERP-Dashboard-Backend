'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Territory extends Model {
 
    static associate(models) {
      Territory.hasMany(models.SalesOrder,{foreignKey:"territoryId",as:"SalesOrders",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Territory.hasMany(models.Territory,{foreignKey:"parentId",as:"childTerritory", onDelete: 'CASCADE',onUpdate: 'CASCADE'});
      Territory.belongsTo(models.Territory,{foreignKey:"parentId",as:"parentTerritory",onDelete:"SET NULL",onUpdate:"CASCADE"});
    }
  }
  Territory.init({
    name: DataTypes.STRING,
    isParent: DataTypes.BOOLEAN,
    parentId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Territory',
  });
  return Territory;
};