var express=require("express")
const authMiddleware = require("../../middleware/authMiddleware")
const checkPermission = require("../../middleware/checkPermission")
const { CreateProductionOrder, getProductionOrder } = require("../../controller/Production/ProductionOrderController")
var router=express.Router()



router.post("/create",authMiddleware,checkPermission("create"),CreateProductionOrder)
router.get("/view/:id",authMiddleware,getProductionOrder)


module.exports=router