const {Currency}=require("../../models")


const CreateCurrency=async (req,res) => {
    const user=req.user
     // Check if the user has the 'create' permission
     if (!user?.permission?.includes("create")) {
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


module.exports={
    CreateCurrency,
    GetCurrencies
}