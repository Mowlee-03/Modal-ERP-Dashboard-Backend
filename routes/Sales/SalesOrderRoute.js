const express=require("express")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { CREATE_SALES_ORDER } = require("../../controller/Sales/SalesOrderController")

router.post("/create_sales_order",authMiddleware,CREATE_SALES_ORDER)


module.exports=router