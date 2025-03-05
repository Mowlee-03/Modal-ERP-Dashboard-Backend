var express=require("express")
const { CreateCurrency,GetCurrencies } = require("../../controller/Masters/CurrencyController")
var router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_currency",authMiddleware,CreateCurrency)
router.get("/get_currencies",authMiddleware,GetCurrencies)


module.exports=router