'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pricelists extends Model {
    static associate(models) {
      pricelists.hasMany(models.SoBillingDetails,{foreignKey:"priceListId",as:"SoBillings",onDelete:"CASCADE",onUpdate:"CASCADE"});
      pricelists.belongsTo(models.Currency,{foreignKey:"currencyId",as:"currency",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  pricelists.init({
    name: DataTypes.STRING,
    currencyId:DataTypes.INTEGER,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pricelists',
  });
  return pricelists;
};