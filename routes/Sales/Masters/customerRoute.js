const express=require("express")

const router=express.Router()
const authMiddleware = require("../../../middleware/authMiddleware")
const { getAllCustomers, getCustomersfromPartner,createCustomerGroup,getCustomerGroup,updateCustomerGroup,deleteCustomerGroup } = require("../../../controller/Sales/Masters/CustomerController")

router.get("/all_data_of_customers",authMiddleware,getAllCustomers),
router.get("/get_customers",authMiddleware,getCustomersfromPartner)


//CUSTOMER GROUPS
router.post("/group/create",authMiddleware,createCustomerGroup)
router.get("/group/viewall",authMiddleware,getCustomerGroup)
router.put("/group/update/:id",authMiddleware,updateCustomerGroup)
router.delete("/group/delete/:id",authMiddleware,deleteCustomerGroup)

module.exports=router