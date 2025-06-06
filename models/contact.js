'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {

    static associate(models) {
      Contact.belongsTo(models.Partner,{foreignKey:'partnerId',as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"});
      Contact.hasMany(models.Address,{foreignKey:"contactId",as:"addresses",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  Contact.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    partnerId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobile: DataTypes.STRING,
    fax: DataTypes.STRING,
    salesPerson: DataTypes.STRING,
    primaryContact: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
    source: DataTypes.STRING,
    territory: DataTypes.STRING,
    industry: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};