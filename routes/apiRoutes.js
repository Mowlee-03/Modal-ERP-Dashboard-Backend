const express=require("express")
const router=express.Router()
const authMiddleware = require("../middleware/authMiddleware")







//SALES
const SalesOrderRoute=require("./Sales/SalesOrderRoute")

router.use("/sales",authMiddleware,SalesOrderRoute)

// SALE MASTERS
const currencyRoute=require("./Sales/Masters/CurrencyRoute")
const pricelistRoute=require("./Sales/Masters/PricelistRoute")
const territoriesRoute=require("./Sales/Masters/TerritoryRoute")
const warehouseRoute=require("./Sales/Masters/WarehouseRoute")
const customerRoute=require("./Sales/Masters/customerRoute")

router.use("/currency",authMiddleware,currencyRoute)
router.use("/pricelists",authMiddleware,pricelistRoute)
router.use("/territory",authMiddleware,territoriesRoute)
router.use("/warehouse",authMiddleware,warehouseRoute)
router.use("/customer",authMiddleware,customerRoute)


//PRODUCTION
const ProductionOrderRoute=require("./Production/ProductionOrderRoutes")
router.use("/production_order",authMiddleware,ProductionOrderRoute)

//PRODUCTION MASTERS 
const BillofMaterialsRoute=require("./Production/Masters/BillofMaterialsRoute")
const productionProcessRoute=require("./Production/Masters/Prod_ProcessRoute")
const workcenterRoute=require("./Production/Masters/WorkCenterRoute")
const RoutingsRoute=require("./Production/Masters/RoutingsRoute")
router.use("/processes",authMiddleware,productionProcessRoute)
router.use("/workcenter",authMiddleware,workcenterRoute)
router.use("/routings",authMiddleware,RoutingsRoute)
router.use("/bom",authMiddleware,BillofMaterialsRoute)




const partnerRoute=require("./Partners/partnerRoute")
const supplierRoute=require("./Partners/supplierRoute")
const itemMasterRoute=require("./Item/ItemMasterRoute")

router.use("/partner",authMiddleware,partnerRoute)

router.use("/supplier",authMiddleware,supplierRoute)

router.use("/item",authMiddleware,itemMasterRoute)

module.exports=router