var express = require('express');
const { CreateUser,
     getUser, 
     USER_INFO, 
     loginUser, 
     logoutUser, 
     getAlluser, 
     allActivityLogs,
     profileUpdate 
    } = require('../../controller/user/userController');
const authMiddleware = require('../../middleware/authMiddleware');
var router = express.Router();

router.post("/login",loginUser)
router.post("/create",authMiddleware,CreateUser)
router.post("/logout",authMiddleware,logoutUser)
router.put("/profile_update/:userId",authMiddleware,profileUpdate)

router.get("/getuser/:userId",getUser)
router.get("/user_info",USER_INFO)
router.get("/allusers",getAlluser)
router.get("/activitylogs",allActivityLogs)
module.exports = router;
