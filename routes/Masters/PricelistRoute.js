const express=require("express")
const { 
    createPricelist, 
    getPricelist, 
    updatePricelist, 
    deletePricelist 
} = require("../../controller/Masters/PriceListsController")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_pricelist",authMiddleware,createPricelist)
router.get("/getpricelist",authMiddleware,getPricelist)
router.put("/update/:id",authMiddleware,updatePricelist)
router.delete("/delete/:id",authMiddleware,deletePricelist)

module.exports=router