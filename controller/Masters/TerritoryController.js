const {Territory}=require("../../models")


const createTerritory=async (req,res) => {
    const user = req.user;

    // Check if the user has the 'create' permission
    if (!user?.permission?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a pricelist."
        });
    }
    try {
        const {name,isParent,parentId}=req.body

        if (isParent) {
            const newTerritory=await Territory.create({name,isParent,parentId:null,},{
                userId:user.id,
                username:user.username,
                ipAddress: req.ip || "Unknown",
                userAgent: req.headers["user-agent"] || "Unknown",
            })
            return res.status(200).json({
                status:200,
                message:"Territory created successfully", 
                data: newTerritory 
            })
        } else {
            if (!parentId) {
                return res.status(400).json({ status: 400, message: "parentId is required when its child" });
            }
            const newTerritory = await Territory.create({ name, isParent, parentId },{
                userId:user.id,
                username:user.username,
                ipAddress: req.ip || "Unknown",
                userAgent: req.headers["user-agent"] || "Unknown",
            });
            return res.status(200).json({ 
                status: 200, 
                message: "Territory created successfully", 
                data: newTerritory 
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            err:error.message
        })
    }
}

const getAllTerritories = async (req, res) => {
    try {
        const territories = await Territory.findAll({ 
            include: ["childTerritory", "parentTerritory"] 
        });
        return res.status(200).json({ 
            status: 200,
            data: territories 
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 500, 
            message: "An error occurred", 
            error: error.message 
        });
    }
};

module.exports={
    createTerritory,
    getAllTerritories
}