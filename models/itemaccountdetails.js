'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemAccountDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemAccountDetails.belongsTo(models.ItemMaster,{
        foreignKey:"itemId",
        as:"item",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  ItemAccountDetails.init({
    itemId: DataTypes.INTEGER,
    hsnCode: DataTypes.STRING,
    salesTax: DataTypes.JSON,
    purchaseTax: DataTypes.JSON,
    salesAccount: DataTypes.STRING,
    purchaseAccount: DataTypes.STRING,
    tariffCode: DataTypes.STRING,
    commodityCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemAccountDetails',
  });
  return ItemAccountDetails;
};