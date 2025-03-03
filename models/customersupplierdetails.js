'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerSupplierDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerSupplierDetails.belongsTo(models.Customer,{foreignKey:"customerId",as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  CustomerSupplierDetails.init({
    customerId: DataTypes.INTEGER,
    payableAccount: DataTypes.STRING,
    purchaseCreditPeriod: DataTypes.INTEGER,
    purchasePriceList: DataTypes.STRING,
    purchasePaymentTerms: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerSupplierDetails',
  });
  return CustomerSupplierDetails;
};