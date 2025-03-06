const express=require("express")
const router=express.Router()
const authMiddleware = require("../middleware/authMiddleware")


const currencyRoute=require("./Masters/CurrencyRoute")
const pricelistRoute=require("./Masters/PricelistRoute")
const territoriesRoute=require("./Masters/TerritoryRoute")
const warehouseRoute=require("./Masters/WarehouseRoute")

router.use("/currency",authMiddleware,currencyRoute)
router.use("/pricelists",authMiddleware,pricelistRoute)
router.use("/territory",authMiddleware,territoriesRoute)
router.use("/warehouse",authMiddleware,warehouseRoute)



module.exports=router