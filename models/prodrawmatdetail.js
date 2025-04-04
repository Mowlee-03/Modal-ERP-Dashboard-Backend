'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdRawMatDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProdRawMatDetail.init({
    PrdOrdId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    applicableFor: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    uom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProdRawMatDetail',
  });
  return ProdRawMatDetail;
};