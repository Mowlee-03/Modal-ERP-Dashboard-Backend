const {Warehouses}=require("../../models")


const createWareHouse=async (req,res) => {
    const user = req.user;
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a pricelist."
        });
    }

    try {
        const {name}=req.body
        const checkWarehosue=await Warehouses.findOne({where:{name:name}})
        if (!checkWarehosue) {
            return res.status(409).json({
                status:409,
                message:"Warehouse Already Exist"
            })
        }

        const newWarehouse=await Warehouses.create({name},{
            userId:user?.id,
            username:user?.username,
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        })
        return res.status(200).json({
            status:200,
            message:"Warehosue Created Succesfully",
            data:newWarehouse
        })
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }
}


const getAllWarehouse=async (req,res) => {
    try {
        const warehouses=await Warehouses.findAll()
        return res.status(200).json({
            status:200,
            message:"Warehouse Fetching Successfully",
            data:warehouses
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error Accured",
            error:error.message
        })
    }
}



module.exports={
    createWareHouse,
    getAllWarehouse
}