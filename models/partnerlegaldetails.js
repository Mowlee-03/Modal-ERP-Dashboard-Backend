'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartnerLegalDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PartnerLegalDetails.belongsTo(models.Partner,{foreignKey:"partnerId",as:"partner",onDelete:"CASCADE",onUpdate:"CASCADE"})
    }
  }
  PartnerLegalDetails.init({
    partnerId: DataTypes.INTEGER,
    gstRegistrationType: DataTypes.STRING,
    gstin: DataTypes.STRING,
    panNo: DataTypes.STRING,
    tanNo: DataTypes.STRING,
    cinNo: DataTypes.STRING,
    supplierCode: DataTypes.STRING,
    msmeRegType: DataTypes.STRING,
    udayamRegNo: DataTypes.STRING,
    msmeRegisteredDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PartnerLegalDetails',
  });
  return PartnerLegalDetails;
};