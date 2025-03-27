var express=require("express")
const { CreateCurrency,GetCurrencies, UpdateCurrency, DeleteCurrency } = require("../../controller/Masters/CurrencyController")
var router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/create_currency",authMiddleware,CreateCurrency)
router.get("/get_currencies",authMiddleware,GetCurrencies)
router.put("/update/:id",authMiddleware,UpdateCurrency)
router.delete("/delete/:id",authMiddleware,DeleteCurrency)

module.exports=router