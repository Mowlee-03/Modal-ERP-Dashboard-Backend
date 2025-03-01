'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemSettings.belongsTo(models.ItemMaster,{
        foreignKey:"itemId",
        as:"item"
      })
    }
  }
  ItemSettings.init({
    itemId: DataTypes.INTEGER,
    trackStock: DataTypes.BOOLEAN,
    salesItem: DataTypes.BOOLEAN,
    purchaseItem: DataTypes.BOOLEAN,
    productionItem: DataTypes.BOOLEAN,
    bomType: DataTypes.STRING,
    defaultRouting: DataTypes.STRING,
    enableSerialNumber: DataTypes.BOOLEAN,
    autoGenerateSerialNo: DataTypes.BOOLEAN,
    serialNoFormat: DataTypes.STRING,
    serialNoCurrentValue: DataTypes.INTEGER,
    enableBatch: DataTypes.BOOLEAN,
    enableSalesKit: DataTypes.BOOLEAN,
    useBillingUOM: DataTypes.STRING,
    billingUOM: DataTypes.STRING,
    allowBackOrder: DataTypes.BOOLEAN,
    useForCasualLabour:DataTypes.BOOLEAN,
    useForInternalLabour:DataTypes.BOOLEAN,
    activityType:DataTypes.STRING,
    useForOandM:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ItemSettings',
  });
  return ItemSettings;
};