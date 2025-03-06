const {
    Partner,PartnerGeneralDetails,
    PartnerLegalDetails,Contact,
    SupplierDetails
}=require("../../models")


const getSupplierWithData=async (req,res) => {
    try {
        const supplier=await Partner.findAll({
            where:{supplier:true},
            include:[
                { model: PartnerGeneralDetails, as: "generalDetails" },
                { model: PartnerLegalDetails, as: "legalDetails" },
                { model: Contact, as: "contactDetails" },
                { model: SupplierDetails, as: "supplierDetails" }
            ]
        })

        res.status(200).json({
            status:200,
            message:"Suppliers Fetched Successfully",
            data:supplier
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }
}

const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Partner.findAll({
            where: { supplier: true },
            attributes: ["id", "name"] // Selecting only id and name
        });

        return res.status(200).json({
            status: 200,
            message: "Suppliers fetched successfully",
            data: suppliers
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
    getSupplierWithData,
    getSuppliers
}