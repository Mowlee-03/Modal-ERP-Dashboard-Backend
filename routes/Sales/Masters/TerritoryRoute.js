const express=require("express")
const { 
    createTerritory, 
    getAllTerritories, 
    updateTerritory, 
    deleteTerritory
} = require("../../../controller/Sales/Masters/TerritoryController")
const router=express.Router()
const authMiddleware = require("../../../middleware/authMiddleware")

router.post("/create_territory",authMiddleware,createTerritory)
router.get("/get_all_territories",authMiddleware,getAllTerritories)
router.put("/update/:territoryId",authMiddleware,updateTerritory)
router.delete("/delete/:territoryId",authMiddleware,deleteTerritory)

module.exports=router