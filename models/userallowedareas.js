'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAllowedAreas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAllowedAreas.init({
    userId: DataTypes.INTEGER,
    allowedAreaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAllowedAreas',
  });
  return UserAllowedAreas;
};