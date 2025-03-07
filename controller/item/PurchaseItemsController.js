const {ItemMaster,PurchaseItemDetails}=require("../../models")



const PurchaseItems=async (req,res) => {
    try {
        const items=await PurchaseItemDetails.findAll({
            include:[{
                model:ItemMaster,
                as:"item",
                attributes:['id','name']
            }]
        })
        res.status(200).json({
            status:200,
            message:"PurchaseItems Fetching Success",
            data:items
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }
}


module.exports={
    PurchaseItems
}