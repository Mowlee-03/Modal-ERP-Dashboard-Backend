const express=require("express")
const { createTerritory, getAllTerritories } = require("../../controller/Masters/TerritoryController")
const router=express.Router()

router.post("/create_territory",createTerritory)
router.post("/get_all_territories",getAllTerritories)

module.exports=router