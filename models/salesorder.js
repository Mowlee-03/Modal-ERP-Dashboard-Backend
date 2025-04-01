'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrder extends Model {
    static associate(models) {
      SalesOrder.hasOne(models.SoBillingDetails,{foreignKey:"salesOrderId",as:"billingDetail",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SalesOrder.hasOne(models.SoDeliveryDetails,{foreignKey:"salesOrderId",as:"deleiveryDetail",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SalesOrder.hasMany(models.SalesOrderItem,{foreignKey:"salesOrderId",as:"items",onDelete:"CASCADE",onUpdate:"CASCADE"});
      SalesOrder.belongsTo(models.Partner,{foreignKey:"customerId",as:"customer",onDelete:"CASCADE",onUpdate:"CASCADE"})
      SalesOrder.belongsTo(models.Territory,{foreignKey:"territoryId",as:"territory",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  SalesOrder.init({
    soId:DataTypes.STRING,
    orderDate: DataTypes.DATE,

    quoteId: DataTypes.INTEGER,

    customerId: DataTypes.INTEGER,

    customerPoNumber: DataTypes.STRING,
    customerPoDate: DataTypes.DATE,
    salesPerson: DataTypes.STRING,
    territoryId: DataTypes.INTEGER,
    remarks:DataTypes.TEXT,

    additionalCharges:DataTypes.JSON,
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
    hooks: {
      beforeCreate: async (order) => {
        const latestOrder = await SalesOrder.findOne({
          order: [["soId", "DESC"]],
        });

        let newId = "SO/1"; // Default ID if no records exist

        if (latestOrder && latestOrder.soId) {
          const lastNumber = parseInt(latestOrder.soId.split("/")[1], 10);
          const nextNumber = lastNumber + 1;

          newId = `SO/${nextNumber}`;
        }

        order.soId = newId; // Assign the new ID
      },
    },
  
  });
  return SalesOrder;
};