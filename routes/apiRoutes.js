const express=require("express")
const router=express.Router()
const authMiddleware = require("../middleware/authMiddleware")



const partnerRoute=require("./Partners/partnerRoute")
const currencyRoute=require("./Sales/Masters/CurrencyRoute")
const pricelistRoute=require("./Sales/Masters/PricelistRoute")
const territoriesRoute=require("./Sales/Masters/TerritoryRoute")
const warehouseRoute=require("./Sales/Masters/WarehouseRoute")
const customerRoute=require("./Sales/Masters/customerRoute")
const supplierRoute=require("./Partners/supplierRoute")
const itemMasterRoute=require("./Item/ItemMasterRoute")
const SalesOrderRoute=require("./Sales/SalesOrderRoute")




//SALES
router.use("/sales",authMiddleware,SalesOrderRoute)

// SALE MASTERS
router.use("/currency",authMiddleware,currencyRoute)
router.use("/pricelists",authMiddleware,pricelistRoute)
router.use("/territory",authMiddleware,territoriesRoute)
router.use("/warehouse",authMiddleware,warehouseRoute)
router.use("/customer",authMiddleware,customerRoute)






router.use("/partner",authMiddleware,partnerRoute)

router.use("/supplier",authMiddleware,supplierRoute)

router.use("/item",authMiddleware,itemMasterRoute)

module.exports=router