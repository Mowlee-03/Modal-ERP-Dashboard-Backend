const express=require("express")
const { createTerritory, getAllTerritories } = require("../../controller/Masters/TerritoryController")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_territory",authMiddleware,createTerritory)
router.get("/get_all_territories",authMiddleware,getAllTerritories)

module.exports=router