const {Currency}=require("../../models")


const CreateCurrency=async (req,res) => {
    const user=req.user
    
     // Check if the user has the 'create' permission
     if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create currency."
        });
    }

    try {
        const {name,exchangeRate}=req.body

        const existCurrency=await Currency.findOne({where:{name:name}})
        if (existCurrency) {
            return res.status(409).json({
                status:409,
                message:"Currency Already Exist"
            })
        }
        const response=await Currency.create({
            name:name,
            exchangeRate:exchangeRate
        },{
            userId:user?.id,
            username:user?.username || "System",
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
        })
        res.status(200).json({
            status:200,
            message:"Currency Created Successfully",
            data:response
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:"An Error Occured",
            error:error.message
        })
    }
}

const GetCurrencies=async (req,res) => {
    try {
        const response =await Currency.findAll()
        res.status(200).json({
            status:200,
            message:"Currency Getted Successfully",
            data:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:500,
            message:"An Error Occured",
            error:error.message
        })
    }
}

const UpdateCurrency = async (req, res) => {
    const user = req.user;

    if (!user?.permissions?.includes("edit")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to edit currency."
        });
    }

    try {
        const { id } = req.params;
        const { name, exchangeRate } = req.body;

        const currency = await Currency.findByPk(id);
        if (!currency) {
            return res.status(404).json({
                status: 404,
                message: "Currency not found"
            });
        }

        await currency.update({ name, exchangeRate });

        res.status(200).json({
            status: 200,
            message: "Currency updated successfully",
            data: currency
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "An error occurred",
            error: error.message
        });
    }
};

const DeleteCurrency = async (req, res) => {
    const user = req.user;

    if (!user?.permissions?.includes("delete")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to delete currency."
        });
    }

    try {
        const { id } = req.params;

        const currency = await Currency.findByPk(id);
        if (!currency) {
            return res.status(404).json({
                status: 404,
                message: "Currency not found"
            });
        }

        await currency.destroy();

        res.status(200).json({
            status: 200,
            message: "Currency deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "An error occurred",
            error: error.message
        });
    }
};


module.exports={
    CreateCurrency,
    GetCurrencies,
    UpdateCurrency,
    DeleteCurrency
}