'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllowedAreas extends Model {
    static associate(models) {
      AllowedAreas.belongsToMany(models.User, { 
        through: "UserAllowedAreas", 
        foreignKey: "allowedAreaId" });
    }
  }
  AllowedAreas.init({
    name:DataTypes.STRING,
    type: DataTypes.ENUM("polygon","circle"),
    coordinates: DataTypes.JSON,
    radius:DataTypes.JSON
  }, {
    sequelize,
    modelName: 'AllowedAreas',
  });
  return AllowedAreas;
};