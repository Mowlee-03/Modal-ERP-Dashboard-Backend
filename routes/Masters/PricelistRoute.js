const express=require("express")
const { createPricelist, getPricelist } = require("../../controller/Masters/PriceListsController")
const router=express.Router()

router.post("/create_pricelist",createPricelist)
router.get("/getpricelist",getPricelist)

module.exports=router