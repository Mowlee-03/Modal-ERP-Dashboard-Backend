'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepartmentRoles extends Model {
    static associate(models) {
      // Define associations here, if necessary
      // For instance, if you want to associate this model with the Department and Role models
      DepartmentRoles.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department',
      });
      DepartmentRoles.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role',
      });
    }
  }
  DepartmentRoles.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DepartmentRoles',
      tableName: 'DepartmentRoles',
    }
  );
  return DepartmentRoles;
};
