'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BomComponentDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  BomComponentDetails.init({
    BomId:DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    quantity: DataTypes.DECIMAL,
    uom: DataTypes.STRING,
    locationRemarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BomComponentDetails',
  });
  return BomComponentDetails;
};