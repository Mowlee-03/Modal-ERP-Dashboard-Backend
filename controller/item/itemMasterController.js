const {
    ItemMaster,
}=require("../../models")


const CREATE_ITEM=async (req,res) => {
    const user = req.user;
    
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a partner."
        });
    }

    const {
        name,description,itemType,categoryId,groupId,baseUOM,barCode,partCode,warranty,componentLocation,//ItemMaster
        trackStock,salesItem,purchaseItem,productionItem,bomType,defaultRouting,enableSerialNumber,autoGenerateSerialNo,serialNoFormat,serialNoCurrentValue,enableBatch,enableSalesKit,useBillingUOM,billingUOM,allowBackOrder,//ItemSettings,itemId
        hsnCode,salesTax,purchaseTax,salesAccount,purchaseAccount,tariffCode,commodityCode,//ItemAccountDetails,itemId
        serviceableEquipment,enableSpareWarranty,warrantyDuration,installationApplicable,warrantyApplicable,defaultWarrantyContract,warrantyBasedOn,//ItemServiceDetails,itemId
        defaultPurchaseCost,landingCostMultiple,purchaseUOM,safetyStock,reorderQty,leadTime,supplierId,//PurchaseItemDetails,itemId
        recommendedSellingPrice,minimumSellingPrice,salesUOM,//SalesItemDetails,itemId
    }=req.body

    
    try {
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An erro accure",
            error:error.message
        })
    }
    
}