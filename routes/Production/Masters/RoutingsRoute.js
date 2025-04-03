var express=require("express")
const authMiddleware = require("../../../middleware/authMiddleware")
const checkPermission = require("../../../middleware/checkPermission")
const { 
    CreateRouting, GetAllRoutings, 
    GetRoutingById, UpdateRouting, 
    DeleteRouting 
} = require("../../../controller/Production/Masters/RoutingsController")
var router=express.Router()


router.post("/create",authMiddleware,checkPermission("create"),CreateRouting)
router.get("/viewall",authMiddleware,GetAllRoutings)
router.get("/view/:id",authMiddleware,GetRoutingById)
router.put("/update",authMiddleware,checkPermission("edit"),UpdateRouting)
router.delete("/delete",authMiddleware,checkPermission("delete"),DeleteRouting)



module.exports=router