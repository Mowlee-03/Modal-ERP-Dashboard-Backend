const {
    Partner,CustomerDetails,
    Contact,PartnerGeneralDetails,
    PartnerLegalDetails
}=require("../../models")

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Partner.findAll({
            where: { customer: true },
            include: [
                {
                    model: CustomerDetails,
                    as: "customerDetails"
                },
                {
                    model: Contact,
                    as: "contactDetails"
                },
                {
                    model: PartnerGeneralDetails,
                    as: "generalDetails"
                },
                {
                    model: PartnerLegalDetails,
                    as: "legalDetails"
                }
            ]
        });

        return res.status(200).json({
            status: 200,
            message: "Customers fetched successfully",
            data: customers
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred",
            error: error.message
        });
    }
};

const getCustomersfromPartner=async (req,res) => {
    try {
        const customers=await Partner.findAll({
            where:{customer:true},
            attributes: ["id", "name"]
        })

        res.status(200).json({
            status:200,
            message:"Fetching Customer Success",
            data:customers
        })

    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }
}

module.exports = { 
    getAllCustomers ,
    getCustomersfromPartner,
};
