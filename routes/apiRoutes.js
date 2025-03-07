const express=require("express")
const router=express.Router()
const authMiddleware = require("../middleware/authMiddleware")



const partnerRoute=require("./Partners/partnerRoute")
const currencyRoute=require("./Masters/CurrencyRoute")
const pricelistRoute=require("./Masters/PricelistRoute")
const territoriesRoute=require("./Masters/TerritoryRoute")
const warehouseRoute=require("./Masters/WarehouseRoute")
const customerRoute=require("./Partners/customerRoute")
const supplierRoute=require("./Partners/supplierRoute")
const itemMasterRoute=require("./Item/ItemMasterRoute")
const salesItemsRoute=require("./Item/SalesItemRoute")
const purchaseItemRoute=require("./Item/purchaseItemRoute")
const SalesOrderRoute=require("./SalesOrder/SalesOrderRoute")




router.use("/currency",authMiddleware,currencyRoute)
router.use("/pricelists",authMiddleware,pricelistRoute)
router.use("/territory",authMiddleware,territoriesRoute)
router.use("/warehouse",authMiddleware,warehouseRoute)
router.use("/partner",authMiddleware,partnerRoute)
router.use("/customer",authMiddleware,customerRoute)
router.use("/supplier",authMiddleware,supplierRoute)
router.use("/item",authMiddleware,itemMasterRoute)
router.use("/sales",authMiddleware,salesItemsRoute)
router.use("/purchase",authMiddleware,purchaseItemRoute)
router.use("/sales",authMiddleware,SalesOrderRoute)



module.exports=router