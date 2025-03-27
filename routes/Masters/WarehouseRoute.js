const express=require("express")
const { createWareHouse, updateWareHouse, deleteWarehouse } = require("../../controller/Masters/WareHouseController")
const { getAreaOfPolygon } = require("geolib")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")


router.post("/create_warehouse",authMiddleware,createWareHouse)
router.get("/get_all_warehouse",authMiddleware,getAreaOfPolygon)
router.put("/update_warehouse/:warehouseId",authMiddleware,updateWareHouse)
router.delete("/delete/:warehouseId",authMiddleware,deleteWarehouse)

module.exports=router