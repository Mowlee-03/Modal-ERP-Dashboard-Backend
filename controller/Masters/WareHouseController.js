const {Warehouses}=require("../../models")


const createWareHouse=async (req,res) => {
    const user = req.user;
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a warehouse."
        });
    }

    try {
        const {name}=req.body
        const checkWarehosue=await Warehouses.findOne({where:{name:name}})
        if (checkWarehosue) {
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

const updateWareHouse=async (req,res) => {
    const user = req.user;
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("edit")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to edit a warehouse."
        });
    }

    try {
        const {warehouseId}=req.params
        const {name,isActive}=req.body
        const warehouse=await Warehouses.findOne({where:{id:warehouseId}})
        if (!warehouse) {
            return res.status(404).json({
                status:404,
                message:"Warehouse does not exist"
            })
        }

       await warehouse.update({name,isActive},{
            userId:user?.id,
            username:user?.username,
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        })
        return res.status(200).json({
            status:200,
            message:"Warehosue Updated Succesfully",
        })
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }
}

const deleteWarehouse=async (req,res) => {
    const user = req.user;
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("delete")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to delete a warehouse."
        });
    }
    try {
        const {warehouseId}=req.params


        const warehouse=await Warehouses.findByPk(warehouseId)
        if (!warehouse) {
            return res.status(404).json({
                status:404,
                message:"Warehouse does not found"
            })
        }


        await warehouse.destroy()
        return res.status(200).json({
            status:200,
            message:"Warehouse deleted successfully"
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
    createWareHouse,
    getAllWarehouse,
    updateWareHouse,
    deleteWarehouse
}