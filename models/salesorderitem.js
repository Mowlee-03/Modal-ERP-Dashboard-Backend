'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrderItem extends Model {

    static associate(models) {
      SalesOrderItem.belongsTo(models.SalesOrder,{foreignKey:"salesOrderId",as:"order",});
      SalesOrderItem.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"item"});
    }
  }
  SalesOrderItem.init({
    salesOrderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    uom: DataTypes.STRING,
    rate: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    amount: DataTypes.FLOAT,
    warehouse: DataTypes.STRING,
    deliveryDate: DataTypes.DATE,
    displayGroup: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SalesOrderItem',
  });
  return SalesOrderItem;
};
