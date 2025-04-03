var express=require("express")
const authMiddleware = require("../../../middleware/authMiddleware")
const checkPermission = require("../../../middleware/checkPermission")
const { CreateWorkCenter, GetWorkCenters, UpdateWorkCenter, DeleteWorkCenter } = require("../../../controller/Production/Masters/WorkCenterController")
var router=express.Router()



router.post("/create",authMiddleware,checkPermission("create"),CreateWorkCenter)
router.get("/viewall",authMiddleware,GetWorkCenters)
router.put("/update/:id",authMiddleware,checkPermission("edit"),UpdateWorkCenter)
router.delete("/delete/:id",authMiddleware,checkPermission("delete"),DeleteWorkCenter)



module.exports=router