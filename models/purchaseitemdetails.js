'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseItemDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseItemDetails.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"item",onDelete:"CASCADE",onUpdate:"CASCADE"});
      PurchaseItemDetails.belongsTo(models.Partner,{foreignKey:"supplierId",as:"defaultSupplier",onDelete:"SET NULL",onUpdate:"CASCADE"});

    }
  }
  PurchaseItemDetails.init({
    itemId: DataTypes.INTEGER,
    defaultPurchaseCost: DataTypes.FLOAT,
    landingCostMultiple: DataTypes.FLOAT,
    purchaseUOM: DataTypes.STRING,
    safetyStock: DataTypes.FLOAT,
    reorderQty: DataTypes.FLOAT,
    leadTime: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PurchaseItemDetails',
  });
  return PurchaseItemDetails;
};