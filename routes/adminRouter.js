var express=require("express")
const { 
    createPermission, 
    getAllpermissions, 
    createRole, 
    viewRoleWithPermissions, 
    createDepartment, 
    viewallDepartment,
    assignRolesToDepartment,
    CreateAllowedArea,
    GetAllowedArea,
    AssignUsersToLocation,
    getUsers_Of_AllowedArea,
    Update_Role,
    viewAllroles,
    updateRolesToDepartmet,
    removeRoleFromDepartment
} = require("../controller/adminController")
var router=express.Router()


router.get("/permissions/getall",getAllpermissions)
router.get("/role/permissions_and_department",viewRoleWithPermissions)
router.get("/department/view_all",viewallDepartment)
router.get("/allowedAreas",GetAllowedArea)
router.get("/area/:areaId/users",getUsers_Of_AllowedArea)
router.get('/roles/viewall',viewAllroles)

router.post("/permissions/create",createPermission)
router.post("/role/create",createRole)
router.post("/department/create",createDepartment)
router.post("/assignrole_to_department",assignRolesToDepartment)
router.post("/allowedAreas/store",CreateAllowedArea)
router.post("/assign_location_to_user",AssignUsersToLocation)


router.put("/role/update_permissions",Update_Role)
router.put('/department/:departmentId/add-roles',updateRolesToDepartmet)
//remove 
router.put('/department/:departmentId/remove-roles', removeRoleFromDepartment)
module.exports=router