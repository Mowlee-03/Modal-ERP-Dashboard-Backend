'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesOrder.init({
    soId:DataTypes.STRING,

    customerId: DataTypes.INTEGER,

    orderDate: DataTypes.DATE,

    quoteId: DataTypes.INTEGER,

    customerPoNumber: DataTypes.STRING,
    customerPoDate: DataTypes.DATE,
    salesPerson: DataTypes.STRING,
    territory: DataTypes.STRING,
    remarks:DataTypes.TEXT,
    
    currency:DataTypes.STRING,
    priceList:DataTypes.STRING,
    paymentTerms:DataTypes.STRING,
    creditPeriod:DataTypes.INTEGER,
    frieghtName:DataTypes.STRING,
    defaultTax:DataTypes.JSON,
    billingContact:DataTypes.STRING,
    billingAddress:DataTypes.STRING,

    deliveryPolicy:DataTypes.STRING,//Like After Order,After Payement
    deliveryDate:DataTypes.DATE,
    warehouse:DataTypes.STRING,
    consignee:DataTypes.STRING,
    modeOfDispatch:DataTypes.STRING,
    deliveryContact:DataTypes.STRING,
    deliveryAddress:DataTypes.STRING,

    totalAmount:DataTypes.FLOAT,
    amountWithTax:DataTypes.FLOAT,
    roundOffMethod:DataTypes.STRING,
    roundOffValue:DataTypes.FLOAT,
    finalAmountDollar:DataTypes.FLOAT,
    finalAmountInr:DataTypes.FLOAT,
    termsAndConditions:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalesOrder',
  });
  return SalesOrder;
};