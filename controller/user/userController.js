const { where } = require("sequelize")
const Model=require("../../models")
const { hashPassword, verifyPassword } = require("../../utils/password")
const Usercontroller =Model.User
const DepartmentRoleController=Model.DepartmentRoles
const ActivityLogsController=Model.ActivityLogs
const { verifyToken, generateToken, setAuthTokenCookie } = require("../../utils/token")
const geolib = require("geolib");


const CreateUser=async (req,res) => {
    try {
        const {
            username,
            email,
            password,
            roleId,
            departmentId
        }=req.body

        
        const existUser=await Usercontroller.findOne({
            where:{
                email:email
            }
        })
        if (existUser) {
            return res.status(409).json({
                status:409,
                message:"User Already Exist"
            })
        }
        const roleExistsInDepartment = await DepartmentRoleController.findOne({
            where: {role_id:roleId,
                    department_id:departmentId }
          });
          if (!roleExistsInDepartment) {
            return res.status(404).json({
                status:404,
                message:"Role In this Department is missing"
            })
          }
        const hashpass=hashPassword(password)

        const userCount = await Usercontroller.count();
        const create=await Usercontroller.create({
            username:username,
            email:email,
            password:hashpass,
            role_id:roleId,
            department_id:departmentId
        }, 
        userCount === 0
        ? {} // If it's the first user, don't pass options (prevents logging)
        : {
            userId: req.user?.id || null,
            username: req.user?.username || "System",
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        })
        res.status(200).json({
            status:200,
            message:"Created Successfully",
            data:create
        })


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            err:error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, userLocation } = req.body;
        console.log(userLocation);

        

        const userdata = await Usercontroller.findOne({
            where: { email: email },
            include: [
                {
                    model: Model.Role,
                    as: 'role',
                    include: {
                        model: Model.Permission,
                        as: 'permissions',
                        through: { attributes: [] },
                        attributes: ['action']
                    }
                },
                {
                    model: Model.Department,
                    as: 'department'
                },
                {
                    model: Model.AllowedAreas,
                    as: 'AllowedAreas'
                }
            ]
        });

        if (!userdata) {
            return res.status(404).json({
                status: 404,
                message: "User Not Found"
            });
        }

        // Verify password
        const verifyPass = await verifyPassword(password, userdata.password);
        if (!verifyPass) {
            return res.status(403).json({
                status: 403,
                message: "Invalid Password"
            });
        }

        // Get role, permissions, and department info
        const roleName = userdata.role ? userdata.role.name : null;
        const permissions = userdata.role?.permissions
            ? userdata.role.permissions.map(perm => perm.action)
            : [];
        const departmentName = userdata.department ? userdata.department.department_name : null;
        
        if (!userLocation && departmentName !== "all") {
            return res.status(404).json({
                status: 404,
                message: "Location Not Found"
            });
        }
        // If user has a department, allow access without location check
        if (departmentName !== "all") {
            // Check if user is within the allowed area
            let isAllowed = false;
            for (const area of userdata.AllowedAreas) {
                if (area.type === "polygon") {
                    isAllowed = geolib.isPointInPolygon(userLocation, area.coordinates);
                } else if (area.type === "circle") {
                    isAllowed = geolib.isPointWithinRadius(userLocation, area.coordinates, area.radius);
                }
                if (isAllowed) break;
            }

            if (!isAllowed) {
                return res.status(403).json({
                    status: 403,
                    message: "You are not in the allowed area!"
                });
            }
        }

        // Generate token
        const token = generateToken({
            id: userdata.id,
            username: userdata.username,
            role: roleName,
            permissions: permissions,
            department: departmentName
        });

        // Set authentication token cookie
        setAuthTokenCookie(res, token);

        await userdata.update({ 
            is_Active:true,
            last_login: new Date()
         },{userId:userdata.id,ipAddress:req.ip,userAgent:req.headers["user-agent"],action:"User Logged in"});

        res.status(200).json({
            status: 200,
            message: "Login Successful",
        });
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const USER_INFO=async(req, res) => {  
  try {
    const token = req.cookies.authToken; // Get the token from the cookie
    if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
    const decoded_user=verifyToken(token)
    if (decoded_user.error) {
        return res.status(403).json({
            status:403,
            message:decoded_user.error
        })
    }
    res.status(200).json({
        status:200,
        message:"User Fetched Successfully",
        data:decoded_user
    })
    
  } catch (error) {
    res.status(500).json({ 
        status:500,
        message: 'Invalid token' ,
        err:error.message
    });
  }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userdata = await Usercontroller.findOne({
            where: { id: userId },
            include: [
                {
                    model: Model.Role,
                    as: 'role',
                    include: {
                        model: Model.Permission,
                        as: 'permissions',
                        through: { attributes: [] },
                        attributes: ['action']
                    }
                },
                {
                    model: Model.Department,
                    as: 'department'
                },
                
            ]
        });

        if (!userdata) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        // Clone the user data to avoid modifying Sequelize instances directly
        const responseData = userdata.get({ plain: true });

        // Transform permissions into an array of actions
        if (responseData.role && responseData.role.permissions) {
            responseData.role.permissions = responseData.role.permissions.map(perm => perm.action);
        }

        return res.status(200).json({
            status: 200,
            message: "Success",
            data: responseData
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred",
            error: error.message
        });
    }
};

const getAlluser=async (req,res) => {
    try {
        const users=await Usercontroller.findAll({
            include: [
                {
                    model: Model.Role,
                    as: 'role',
                    include: {
                        model: Model.Permission,
                        as: 'permissions',
                        through: { attributes: [] },
                        attributes: ['action']
                    }
                },
                {
                    model: Model.Department,
                    as: 'department'
                },
                {
                    model: Model.AllowedAreas,
                    as: 'AllowedAreas'
                }
            ]
        })
        res.status(200).json({
            status:200,
            message:"Success",
            data:users
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accurred",
            err:error.message
        })
    }
}

const logoutUser=async (req,res) => {
    try {
        const userid=req.user.id

        const user=await Usercontroller.findOne({where:{id:userid}})
        await user.update({ 
            is_Active:false,
         },{userId:userid,ipAddress:req.ip,userAgent:req.headers["user-agent"],action:"User Logged Out"});


        res.clearCookie("authToken",{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            path:"/"
        })
        res.status(200).json({
            status:200,
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:"An Internal Server Error",
            err:error.message
        })
    }
}

const allActivityLogs=async (req,res) => {
    try {
        const response=await ActivityLogsController.findAll({
            include:[{
                model:Model.User,
                as:"user",
                attributes:["id",'username']
            },
            { 
                model: Model.User,
                as: "executor", 
                attributes: ["id", "username"] 
            }
        ]
        })
        res.status(200).json({
            status:200,
            message:"ActivityLogs Getting Successfully",
            data:response
        })

    } catch (error) {
        res.status(500).json({
            status:500,
            message:"An Error Accured",
            error:error.message
        })
    }
}

const profileUpdate=async (req,res) => {
    try {
        const {userId}=req.params
        const updateData=req.body

        const userdata =await Usercontroller.findOne({where:{id:userId}})
        if (!userdata) {
            return res.status(404).json({
                status:404,
                message:"User Not Found",
            })
        }
        await userdata.update(updateData,{
            userId:req.user.id,
            ipAddress:req.ip,
            userAgent:req.headers["user-agent"],
            action:"profile_update"
        })

        res.status(200).json({
            status:200,
            message:"Update Successfully",
            
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:500,
            message:"An Internal Server Error"
        })
    }
}

module.exports={
    CreateUser,
    getUser,
    USER_INFO,
    loginUser,
    logoutUser,
    getAlluser,
    allActivityLogs,
    profileUpdate
    
}