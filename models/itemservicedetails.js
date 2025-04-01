'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemServiceDetails extends Model {

    static associate(models) {
      ItemServiceDetails.belongsTo(models.ItemMaster,{foreignKey:"itemId",as:"item",onDelete:"CASCADE",onUpdate:"CASCADE"});
    }
  }
  ItemServiceDetails.init({
    itemId:DataTypes.INTEGER,
    serviceableEquipment: DataTypes.STRING,
    enableSpareWarranty: DataTypes.BOOLEAN,
    warrantyDuration: DataTypes.INTEGER,
    installationApplicable: DataTypes.BOOLEAN,
    warrantyApplicable: DataTypes.BOOLEAN,
    defaultWarrantyContract: DataTypes.STRING,
    warrantyBasedOn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemServiceDetails',
  });
  return ItemServiceDetails;
};