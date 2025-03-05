var express=require("express")
const { CreateCurrency,GetCurrencies } = require("../../controller/Masters/CurrencyController")
var router=express.Router()


router.post("/create_currency",CreateCurrency)
router.get("/get_currencies",GetCurrencies)


module.exports=router