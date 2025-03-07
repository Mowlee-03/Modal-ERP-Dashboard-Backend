const express=require("express")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { PurchaseItems } = require("../../controller/item/PurchaseItemsController")


router.get("/all_items",authMiddleware,PurchaseItems)

module.exports=router