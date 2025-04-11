var express=require("express")
const { CreateProcess ,GetProcess,UpdateProcess,DeleteProcess} = require("../../../controller/Production/Masters/Prod_ProcessController")
const authMiddleware = require("../../../middleware/authMiddleware")
const checkPermission = require("../../../middleware/checkPermission")
var router=express.Router()


router.post("/create",authMiddleware,checkPermission("create"),CreateProcess)
router.get("/viewall",authMiddleware,GetProcess)
router.put("/update/:id",authMiddleware,checkPermission("edit"),UpdateProcess)
router.delete("/delete/:id",authMiddleware,checkPermission("delete"),DeleteProcess)

module.exports=router