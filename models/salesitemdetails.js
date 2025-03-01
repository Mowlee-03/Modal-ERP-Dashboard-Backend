'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItemDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SalesItemDetails.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"item",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  SalesItemDetails.init({
    itemId: DataTypes.INTEGER,
    recommendedSellingPrice: DataTypes.FLOAT,
    minimumSellingPrice: DataTypes.FLOAT,
    salesUOM: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalesItemDetails',
  });
  return SalesItemDetails;
};