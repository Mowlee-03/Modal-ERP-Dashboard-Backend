const express=require("express")
const router=express.Router()

const authMiddleware = require("../../middleware/authMiddleware")
const { getSupplierWithData, getSuppliers } = require("../../controller/partner/SupplierController")


router.get("/all_data_of_suppliers",authMiddleware,getSupplierWithData),
router.get("/get_suppliers",authMiddleware,getSuppliers)


module.exports=router