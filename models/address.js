'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.Contact,{foreignKey:"contactId",as:"contact",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  Address.init({
    contactId: DataTypes.INTEGER,
    addressType: DataTypes.STRING,
    firstLine: DataTypes.STRING,
    secondLine: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    displayAddress: DataTypes.STRING,
    gstin: DataTypes.STRING,
    territory: DataTypes.STRING,
    isPrimary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};