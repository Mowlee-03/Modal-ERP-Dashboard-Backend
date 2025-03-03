'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerGeneralDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerGeneralDetails.belongsTo(models.Customer,{foreignKey:"customerId",as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  CustomerGeneralDetails.init({
    customerId: DataTypes.INTEGER,
    legalName: DataTypes.STRING,
    territory: DataTypes.STRING,
    website: DataTypes.STRING,
    industry: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CustomerGeneralDetails',
  });
  return CustomerGeneralDetails;
};