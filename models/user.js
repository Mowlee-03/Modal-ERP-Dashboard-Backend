'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
      User.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
      User.belongsToMany(models.AllowedAreas, { through: "UserAllowedAreas", foreignKey: "userId" });
      User.hasMany(models.ActivityLogs,{foreignKey:"userId",as:"activityLogs"});
      User.hasMany(models.ActivityLogs, { foreignKey: "executedBy", as: "executedLogs" }); // Logs where user executed action
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    last_login:DataTypes.DATE,
    is_Active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName:"Users",
    hooks:{
      afterCreate:async (user,options) => {
        const { ActivityLogs,User } =require("../models")
           // Count existing users
        const userCount = await User.count();
        
        // Skip logging if this is the first user
        if (userCount === 1) {
          return;
        }
        const createdFields = Object.keys(user.dataValues).map((field) => ({
          field,
          newValue: user.dataValues[field],
          message:`New user created: ${user.username} (${user.email}) by User : ${options.username || "Unknown"}`,
        }));

        await ActivityLogs.create({
          userId:user.id,
          executedBy: options.userId,
          action:'User Created',
          tableName:"Users",
          details:createdFields,
          ipAddress: options.ipAddress || "Unknown",
          userAgent: options.userAgent || "Unknown",
        })

      },
      afterUpdate:async (user,options) => {
        const { ActivityLogs } =require("../models")
        const changes=[];

        Object.keys(user._previousDataValues).forEach((field) => {
          if (user._previousDataValues[field] !== user.dataValues[field]) {
            changes.push({
              field:field,
              oldValue:user._previousDataValues[field],
              newValue:user.dataValues[field]
            })
            // changes.push(`${field}: '${user._previousDataValues[field]}' → '${user.dataValues[field]}'`);
          }
        });

        if (changes.length > 0) {
          await ActivityLogs.create({
            userId:user.id,
            executedBy: options.userId,
            action: options.action, //`Profile Updated (${changes.map(c => c.split(":")[0]).join(", ")})`,
            tableName: "Users",
            details: changes,
            ipAddress: options.ipAddress || "Unknown",
            userAgent: options.userAgent || "Unknown",
          });
        }

      }
    }
  });
  return User;
};

