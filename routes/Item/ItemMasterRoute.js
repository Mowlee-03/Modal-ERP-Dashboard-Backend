const express=require("express")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { CREATE_ITEM } = require("../../controller/item/itemMasterController")

router.post("/create_item",authMiddleware,CREATE_ITEM)

module.exports=router