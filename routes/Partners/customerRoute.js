const express=require("express")

const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { getAllCustomers, getCustomersfromPartner } = require("../../controller/partner/CustomerController")

router.get("/all_data_of_customers",authMiddleware,getAllCustomers),
router.get("/get_customers",authMiddleware,getCustomersfromPartner)

module.exports=router