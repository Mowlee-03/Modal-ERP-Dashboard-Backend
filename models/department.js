'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One department can have many users
      Department.hasMany(models.User, { foreignKey: 'department_id', as: 'users' });

      // Many departments can have many roles
      Department.belongsToMany(models.Role, {
        through: 'DepartmentRoles',
        foreignKey: 'department_id',
        as: 'roles',
      });
    }
  }
  Department.init({
    department_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
    tableName:"Departments",
    
  });
  return Department;
};