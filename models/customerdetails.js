'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerDetails.belongsTo(models.Partner,{foreignKey:"customerId",as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"});
      CustomerDetails.belongsTo(models.CustomerGroup,{foreignKey:"customerGroupId",as:"customerGroup",onDelete:"SET NULL",onUpdate:"CASCADE"});
      CustomerDetails.belongsTo(models.pricelists,{foreignKey:"priceListId",as:"pricelist",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  CustomerDetails.init({
    customerId: DataTypes.INTEGER,
    customerGroupId: DataTypes.STRING,
    salesPerson: DataTypes.STRING,
    collectionPerson: DataTypes.STRING,
    priceListId: DataTypes.INTEGER,
    creditPeriod: DataTypes.INTEGER,
    creditLimit: DataTypes.DECIMAL,
    receivableAccount: DataTypes.STRING,
    paymentTerms: DataTypes.STRING,
    modeOfDispatch: DataTypes.STRING,
    freight: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerDetails',
  });
  return CustomerDetails;
};