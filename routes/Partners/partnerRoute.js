const express=require("express")
const { createPartner } = require("../../controller/partner/PartnerController")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_partner",authMiddleware,createPartner)

module.exports=router