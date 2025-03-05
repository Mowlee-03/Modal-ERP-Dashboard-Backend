const express=require("express")
const { createWareHouse } = require("../../controller/Masters/WareHouseController")
const { getAreaOfPolygon } = require("geolib")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")


router.post("/create_warehouse",authMiddleware,createWareHouse)
router.get("/get_all_warehouse",authMiddleware,getAreaOfPolygon)


module.exports=router