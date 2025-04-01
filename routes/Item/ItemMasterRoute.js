const express=require("express")
const router=express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const { CREATE_ITEM, PurchaseItems, SalesItems, GET_ALL_ITEMS } = require("../../controller/item/itemMasterController")
const { CreateItemCategory, ViewItemCategory, UpdateItemCategory, DeleteItemCategory } = require("../../controller/item/itemCategoryController")


router.post("/create_item",authMiddleware,CREATE_ITEM)

router.get("/get_all_item_master",authMiddleware,GET_ALL_ITEMS)

router.get("/purchase/all_items",authMiddleware,PurchaseItems)
router.get("/sales/all_items",authMiddleware,SalesItems)


//ITEM CATEGORY
router.post("/category/create",authMiddleware,CreateItemCategory)
router.get("/category/viewall",authMiddleware,ViewItemCategory)
router.put("/category/update/:id",authMiddleware,UpdateItemCategory)
router.delete("/category/daelet/:id",authMiddleware,DeleteItemCategory)

module.exports=router