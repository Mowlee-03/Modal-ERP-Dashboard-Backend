'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerGroup extends Model {
    
    static associate(models) {
      CustomerGroup.belongsTo(models.CustomerGroup,{foreignKey:"parentGroupId",as:"parentGroup",onDelete:"SET NULL",onUpdate:"CASCADE"})
      CustomerGroup.hasMany(models.CustomerGroup,{foreignKey:"parentGroupId",as:"childGroups",onDelete:"CASCADE",onUpdate:"CASCADE"})
      CustomerGroup.hasMany(models.CustomerDetails,{foreignKey:"customerGroupId",onDelete:"CASCADE",onUpdate:"CASCADE"})
      CustomerGroup.belongsTo(models.pricelists,{foreignKey:"pricelistId",as:"pricelist",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  CustomerGroup.init({
    name: DataTypes.STRING,
    isParent: DataTypes.BOOLEAN,
    parentGroupId: DataTypes.UUID,
    pricelistId: DataTypes.INTEGER,
    creditLimit: DataTypes.DECIMAL,
    creditPeriod: DataTypes.INTEGER,
    receivableAccount: DataTypes.STRING,
    description: DataTypes.TEXT,
    skipCreditLimitException: DataTypes.BOOLEAN,
    isActive:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CustomerGroup',
  });
  return CustomerGroup;
};