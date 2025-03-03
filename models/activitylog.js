'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityLogs extends Model {
    
    static associate(models) {
     ActivityLogs.belongsTo(models.User,{foreignKey:"userId",as:"user"})
     ActivityLogs.belongsTo(models.User, { foreignKey: 'executedBy', as: 'executor' }); // Executor of Action
    }
  }
  ActivityLogs.init({
    userId: DataTypes.INTEGER,
    executedBy:DataTypes.INTEGER,
    action: DataTypes.STRING,
    tableName: DataTypes.STRING,
    details: DataTypes.JSON,
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ActivityLogs',
    tableName:'ActivityLogs'
  });
  return ActivityLogs;
};



