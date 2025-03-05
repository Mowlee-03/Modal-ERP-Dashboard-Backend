const express=require("express")
const { createPricelist, getPricelist } = require("../../controller/Masters/PriceListsController")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_pricelist",authMiddleware,createPricelist)
router.get("/getpricelist",authMiddleware,getPricelist)

module.exports=router