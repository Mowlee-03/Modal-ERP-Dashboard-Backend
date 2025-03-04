'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartnerGeneralDetails extends Model {
    static associate(models) {
      PartnerGeneralDetails.belongsTo(models.Partner,{foreignKey:"partnerId",as:"partner",onDelete:"CASCADE",onUpdate:"CASCADE"});
      PartnerGeneralDetails.belongsTo(models.Territory,{foreignKey:"territoryId",as:"PartnerGeneralDetails",onDelete:"SET NULL",onUpdate:"CASCADE"})
    }
  }
  PartnerGeneralDetails.init({
    partnerId: DataTypes.INTEGER,
    legalName: DataTypes.STRING,
    territoryId: DataTypes.INTEGER,
    website: DataTypes.STRING,
    industry: DataTypes.STRING,
    remarks: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PartnerGeneralDetails',
  });
  return PartnerGeneralDetails;
};