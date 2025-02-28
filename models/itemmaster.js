'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemMaster.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    itemType: DataTypes.STRING,
    product: DataTypes.STRING,
    category: DataTypes.STRING,
    group: DataTypes.STRING,
    baseUOM: DataTypes.STRING,
    barCode: DataTypes.STRING,
    partCode: DataTypes.STRING,
    warranty: DataTypes.INTEGER,
    componentLocation: DataTypes.STRING,
    trackStock: DataTypes.BOOLEAN,
    salesItem: DataTypes.BOOLEAN,
    purchaseItem: DataTypes.BOOLEAN,
    productionItem: DataTypes.BOOLEAN,
    enableSerialNumber: DataTypes.BOOLEAN,
    enableBatch: DataTypes.BOOLEAN,
    enableSalesKit: DataTypes.BOOLEAN,
    useBillingUOM: DataTypes.BOOLEAN,
    allowBackOrder: DataTypes.BOOLEAN,
    recommendedSellingPrice: DataTypes.FLOAT,
    minimumSellingPrice: DataTypes.FLOAT,
    salesUOM: DataTypes.STRING,
    defaultPurchaseCost: DataTypes.FLOAT,
    landingCostMultiple: DataTypes.FLOAT,
    purchaseUOM: DataTypes.STRING,
    safetyStock: DataTypes.FLOAT,
    reorderQty: DataTypes.FLOAT,
    leadTime: DataTypes.INTEGER,
    defaultSupplier: DataTypes.STRING,
    serviceableEquipment: DataTypes.STRING,
    hsnCode: DataTypes.STRING,
    salesTax: DataTypes.STRING,
    purchaseTax: DataTypes.STRING,
    salesAccount: DataTypes.STRING,
    purchaseAccount: DataTypes.STRING,
    tariffCode: DataTypes.STRING,
    commodityCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemMaster',
  });
  return ItemMaster;
};