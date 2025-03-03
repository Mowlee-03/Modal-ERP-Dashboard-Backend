'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerLegalDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerLegalDetails.belongsTo(models.Customer,{foreignKey:"customerId",as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  CustomerLegalDetails.init({
    customerId: DataTypes.INTEGER,
    gstRegistrationType: DataTypes.STRING,
    gstin: DataTypes.STRING,
    panNo: DataTypes.STRING,
    tanNo: DataTypes.STRING,
    cinNo: DataTypes.STRING,
    supplierCode: DataTypes.STRING,
    msmeRegType: DataTypes.STRING,
    udayamRegNo: DataTypes.STRING,
    msmeRegisteredDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CustomerLegalDetails',
  });
  return CustomerLegalDetails;
};