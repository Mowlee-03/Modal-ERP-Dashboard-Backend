'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdRawMatDetail extends Model {

    static associate(models) {
      ProdRawMatDetail.belongsTo(models.ProductionOrder,{foreignKey:"PrdOrdId",as:"productionOrder",onDelete:"CASCADE",onUpdate:"CASCADE"});
      ProdRawMatDetail.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"rawmaterial",onDelete:"CASCADE",onUpdate:"CASCADE"});
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