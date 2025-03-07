const {ItemMaster,SalesItemDetails}=require("../../models")



const SalesItems=async (req,res) => {
    try {
        const items=await SalesItemDetails.findAll({
            include:[{
                model:ItemMaster,
                as:"item",
                attributes:['id','name']
            }]
        })
        res.status(200).json({
            status:200,
            message:"SalesItems Fetching Success",
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
    SalesItems
}