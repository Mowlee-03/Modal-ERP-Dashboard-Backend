'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: 'RolePermissions',
        foreignKey: 'permission_id',
        as: 'roles'
      });
    }
  }
  Permission.init({
    action: {
      type: DataTypes.ENUM('create', 'edit', 'view', 'delete'), // Define ENUM here
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Permission',
    tableName:'Permissions'
  });
  return Permission;
};