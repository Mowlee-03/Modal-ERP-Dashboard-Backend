const express=require("express")
const router=express.Router()



const currencyRoute=require("./Masters/CurrencyRoute")
const pricelistRoute=require("./Masters/PricelistRoute")
const territoriesRoute=require("./Masters/TerritoryRoute")
const warehouseRoute=require("./Masters/WarehouseRoute")

router.use("/currency",currencyRoute)
router.use("/pricelists",pricelistRoute)
router.use("/territory",territoriesRoute)
router.use("/warehouse",warehouseRoute)



module.exports=router