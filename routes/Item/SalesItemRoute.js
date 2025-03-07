const express=require("express")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { SalesItems } = require("../../controller/item/SalesItemsController")

router.get("/all_items",authMiddleware,SalesItems)

module.exports=router