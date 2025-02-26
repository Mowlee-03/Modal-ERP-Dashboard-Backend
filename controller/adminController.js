const Model = require("../models");
const {Op}=require('sequelize')
const RoleController = Model.Role;
const PermissionController=Model.Permission
const DepartmentController=Model.Department
const AllowedAreaController=Model.AllowedAreas
const UsersController=Model.User
const DepartmnetRoleController=Model.DepartmentRoles

const createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        // Check if permissions are provided and if they are not empty
        if (!permissions || permissions.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Permissions are required to create a role",
            });
        }

        // Check if the role already exists
        const existRole = await RoleController.findOne({ where: { name } });
        if (existRole) {
            return res.status(409).json({
                status: 409,
                message: "Role Already Exists",
            });
        }

        // Create the new role
        const role = await RoleController.create({ name });

        // Assuming `permissions` is an array of permission IDs, associate them with the role
        await role.addPermissions(permissions);  // Sequelize auto-generated method to handle many-to-many relationships

        return res.status(201).json({
            status: 201,
            message: "Role Created Successfully",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An Error Occurred",
            err: error.message,
        });
    }
};

const createPermission=async (req,res) => {
    try {
        const {action}=req.body
        const existPermission=await PermissionController.findOne({
            where:{action:action}
        })
        if (existPermission) {
            return res.status(409).json({
                status:409,
                message:"Permission Already Exist"
            })
        }
        await PermissionController.create({
            action:action
        })
        res.status(200).json({
            status:200,
            message:"Permission Created Succefully"
        })
        
    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            err:error.message
        })
    }
}

const createDepartment=async (req,res) => {
    try {
        const {department_name}=req.body
        const existDepartment=await DepartmentController.findOne({
            where:{
                department_name:department_name
            }
        })
        if (existDepartment) {
            return res.status(409).json({
                status:409,
                message:"Department Already Exist"
            })
        }
        const resonse=await DepartmentController.create({department_name:department_name})
        res.status(200).json({
            status:200,
            message:"Department Created Successfully",
            data:resonse
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An Error Occurred",
            err: error.message,
        });
    }
}

const getAllpermissions=async (req,res) => {
    try {
        const data=await PermissionController.findAll()
        res.status(200).json({
            status:200,
            message:"Success",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            Message:"An Error Accured",
            err:error.message
        })
    }
}

const viewAllroles=async (req,res) => {
    try {
        const response =await RoleController.findAll()
        res.status(200).json({
            status:200,
            message:"Success",
            data:response
        })
    } catch (error) {
       return res.status(500).json({
            status:500,
            message:"An Error Accured",
            err:error.message
        })
    }
}

const viewRoleWithPermissions = async (req, res) => {
    try {
        const role = await RoleController.findAll({
            include: [
                {
                    model: Model.Permission,
                    as:"permissions" , // Assuming the Permission model is defined
                   through: { attributes: [] },  // Exclude the join table data (RolePermissions)
                   attributes: ['action']  // Include only the necessary fields for permissions
                },
                {
                    model:Model.Department,
                    as: 'department',
                    through: { attributes: [] },
                    attributes:['department_name']
                }
            ]
        });
        return res.status(200).json({
            status: 200,
            message: "Role and Permissions fetched successfully",
            data: role
        });
    } catch (error) {
        console.error("Error fetching role with permissions:", error);  // Log the error for debugging
        return res.status(500).json({
            status: 500,
            message: "An Error Occurred",
            err: error.message
        });
    }
};

const viewallDepartment=async (req,res) => {
    try {
        const data=await DepartmentController.findAll({
            include:[
                {
                    model:Model.Role,
                    through: { attributes: [] },
                    as:"roles"
                }
            ]
        })
        res.status(200).json({
            status:200,
            message:"Success",
            data:data
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An Error Accured",
            err:error.message
        })
    }
}

const assignRolesToDepartment = async (req, res) => {
    try {
        const { role_ids, department_id } = req.body; // Expect role_ids as an array

        if (!Array.isArray(role_ids) || role_ids.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "role_ids must be a non-empty array",
            });
        }

        const department = await DepartmentController.findByPk(department_id);
        if (!department) {
            return res.status(404).json({
                status: 404,
                message: "Department not found",
            });
        }

        const roles = await RoleController.findAll({
            where: { id: role_ids },
        });

        if (roles.length !== role_ids.length) {
            return res.status(404).json({
                status: 404,
                message: "One or more roles not found",
            });
        }

        // Assign multiple roles to the department
        await department.addRoles(roles);

        res.status(200).json({
            status: 200,
            message: "Roles assigned to department successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred",
            err: error.message,
        });
    }
};


const CreateAllowedArea = async (req, res) => {
    try {
        const { name,type,coordinates,radius} = req.body;


        // Check if allowedAreas exists and is an object
        if (!name || !type || !coordinates) {
            return res.status(400).json({ 
                message: "Missing required fields in the allowed area" });
        }

        // Create a new allowed area
        const area = await AllowedAreaController.create({name,type,coordinates,radius});

        res.status(200).json({ 
            status: 200,
            message: "Allowed area created successfully!",
            data: area,
        });
    } catch (error) {
        console.error("Error creating allowed areas:", error);
        res.status(500).json({ 
            status:500,
            message: "Failed to create allowed areas" ,
        error:error.message
        });
    }
};


const AssignUsersToLocation=async (req, res) => {
    try {
      const { areaId, userIds } = req.body;
  
      if (!areaId || !userIds || !Array.isArray(userIds)) {
        return res.status(400).json({ error: "Invalid data provided" });
      }
  
      const area = await AllowedAreaController.findByPk(areaId);
      if (!area) {
        return res.status(404).json({ error: "Allowed area not found" });
      }
  
      const users = await UsersController.findAll({ where: { id: userIds } });
  
      if (users.length === 0) {
        return res.status(404).json({ error: "No valid users found" });
      }
  
      await area.addUsers(users);
  
      res.json({ message: "Users assigned successfully!", area, assignedUsers: users });
    } catch (error) {
      console.error("Error assigning users:", error);
      res.status(500).json({ message: error.message });
    }
  }

const GetAllowedArea =async (req, res) => {
    try {
      const allowedArea = await AllowedAreaController.findAll();
      if (!allowedArea) return res.status(404).json({ error: "Allowed area not found" });
      res.json(allowedArea);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

const getUsers_Of_AllowedArea=async (req,res) => {
    try {
        const {areaId}=req.params
console.log(areaId);

        if (!areaId) {
            return res.status(400).json({
                status:400,
                message:"Data Is Missing"
            })
        }

        const response=await AllowedAreaController.findOne({
            where:{id:parseInt(areaId)},
            include:[{
                model:Model.User,
                as:"Users",
                through: { attributes: [] },  // Exclude the join table data (RolePermissions)
                attributes: ['id','username']
            }]
        })
        if (!response) {
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }
        res.status(200).json({
            status:200,
            message:"Success",
            data:response
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            err:error.message
        })
    }
}

const Update_Role=async (req, res) => {
    const { roleId, permissions } = req.body;
  
    if (!roleId || !Array.isArray(permissions)) {
      return res.status(400).json({ message: "Invalid request data" });
    }
  
    try {
      // Find the role
      const role = await RoleController.findByPk(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      // Find permissions by action names
      const permissionRecords = await PermissionController.findAll({
        where: { action: permissions },
      });
  
      // Update role's permissions using setPermissions (Sequelize M:M association)
      await role.setPermissions(permissionRecords);
  
      res.status(200).json({ message: "Permissions updated successfully" });
    } catch (error) {
      console.error("Error updating permissions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

const updateRolesToDepartmet=async (req, res) => {
    const { departmentId } = req.params;
    const { role_ids } = req.body;
    
    if (!departmentId || !Array.isArray(role_ids) || role_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request. Department ID and non-empty role IDs array are required'
      });
    }
  
    const transaction = await Model.sequelize.transaction();
  
    try {
      // Check if department exists
      const department = await DepartmentController.findByPk(departmentId);
      if (!department) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }
  
      // Get current role associations
      const currentRoles = await DepartmnetRoleController.findAll({
        where: { department_id: departmentId },
        transaction
      });
  
      const currentRoleIds = currentRoles.map(dr => dr.role_id);
      
      // Find roles to add (in new list but not in current)
      const rolesToAdd = role_ids.filter(id => !currentRoleIds.includes(id));
  
      // Add new role associations
      if (rolesToAdd.length > 0) {
        // Verify all roles exist before adding
        const existingRoles = await RoleController.findAll({
          where: { id: { [Op.in]: rolesToAdd } },
          transaction
        });
        
        const validRoleIds = existingRoles.map(role => role.id);
        
        // Only add roles that exist
        const roleRecords = validRoleIds.map(role_id => ({
          department_id: departmentId,
          role_id
        }));
        
        if (roleRecords.length > 0) {
          await DepartmnetRoleController.bulkCreate(roleRecords, { transaction });
        }
      }
  
      await transaction.commit();
      
      // Fetch updated department with roles
      const updatedDepartment = await DepartmentController.findByPk(departmentId, {
        include: [{
            model:Model.Role,
            through: { attributes: [] },
            as:"roles"
        }]
      });
  
      return res.status(200).json({
        success: true,
        message: 'Roles added to department successfully',
        data: updatedDepartment
      });
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error adding roles to department:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to add roles to department',
        error: error.message
      });
    }
}
  
const removeRoleFromDepartment=async (req, res) => {
    const { departmentId } = req.params;
    const { role_ids } = req.body;
    
    if (!departmentId || !Array.isArray(role_ids) || role_ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request. Department ID and non-empty role IDs array are required'
      });
    }
  
    const transaction = await Model.sequelize.transaction();
  
    try {
      // Check if department exists
      const department = await DepartmentController.findByPk(departmentId);
      if (!department) {
        await transaction.rollback();
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }
      // Remove the specified roles
      await DepartmnetRoleController.destroy({
        where: {
          department_id: departmentId,
          role_id: { [Op.in]: role_ids }
        },
        transaction
      });
      await transaction.commit();
      // Fetch updated department with roles
      return res.status(200).json({
        success: true,
        message: 'Roles removed from department successfully',
      });
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing roles from department:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to remove roles from department',
        error: error.message
      });
    }
}

module.exports={
    createRole,
    createPermission,
    createDepartment,
    getAllpermissions,
    viewRoleWithPermissions,
    viewallDepartment,
    assignRolesToDepartment,
    CreateAllowedArea,
    AssignUsersToLocation,
    GetAllowedArea,
    getUsers_Of_AllowedArea,
    Update_Role,
    viewAllroles,
    updateRolesToDepartmet,
    removeRoleFromDepartment
}