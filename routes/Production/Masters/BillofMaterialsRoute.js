var express=require("express")
const authMiddleware = require("../../../middleware/authMiddleware")
const checkPermission = require("../../../middleware/checkPermission")
const { CreateBillofMaterials, GetBillOfMaterials, UpdateBillOfMaterials, DeleteBillOfMaterials } = require("../../../controller/Production/Masters/BillofMaterialsController")
var router=express.Router()



router.post("/create",authMiddleware,checkPermission("create"),CreateBillofMaterials)
router.get("/view/:id",authMiddleware,GetBillOfMaterials)
router.post("/update/:id",authMiddleware,checkPermission("edit"),UpdateBillOfMaterials)
router.post("/delete/:id",authMiddleware,checkPermission("delete"),DeleteBillOfMaterials)


module.exports=router