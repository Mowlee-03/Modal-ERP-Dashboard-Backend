'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
   
    static associate(models) {
     // One role can have many users
     Role.hasMany(models.User, { foreignKey: 'role_id', as: 'users' });

     // Many roles can belong to many departments
     Role.belongsToMany(models.Department, {
       through: 'DepartmentRoles',
       foreignKey: 'role_id',
       as: 'department',
     });

     // A role can have many permissions
     Role.belongsToMany(models.Permission, {
       through: 'RolePermissions',
       foreignKey: 'role_id',
       as: 'permissions',
     });
    }
  }
  Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName:"Roles"
  });
  return Role;
};