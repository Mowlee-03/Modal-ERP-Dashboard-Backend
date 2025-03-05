const {pricelists,Currency}=require("../../models")


const createPricelist = async (req, res) => {
    const user = req.user;
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a pricelist."
        });
    }

    try {
        const { name, currencyId, description } = req.body;

        const existingPricelist = await pricelists.findOne({ where: { name } });
        if (existingPricelist) {
            return res.status(409).json({
                status: 409,
                message: "Pricelist already exists."
            });
        }


        const currencyExists = await Currency.findOne({ where: { id: currencyId } });
        if (!currencyExists) {
            return res.status(404).json({
                status: 404,
                message: "Currency does not exist."
            });
        }

        const newPricelist = await pricelists.create({
            name,
            description,
            currencyId,
            isActive: true
        },{
            userId:user.id,
            username:user.username,
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        });

        return res.status(200).json({
            status: 200,
            message: "Pricelist added successfully.",
            data: newPricelist
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred.",
            error: error.message
        });
    }
};


const getPricelist=async (req,res) => {
    try {
        const response =await pricelists.findAll()
        return res.status(200).json({
            status:200,
            message:"Pricelist Fetching Successful",
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured"
        })
    }
}

module.exports={
    createPricelist,
    getPricelist
}