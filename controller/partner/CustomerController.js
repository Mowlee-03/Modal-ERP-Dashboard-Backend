const {
    Partner,CustomerDetails,
    Contact,PartnerGeneralDetails,
    PartnerLegalDetails,CustomerGroup,pricelists
}=require("../../models")

const createCustomerGroup=async (req,res) => {
    try {
        const user = req.user;
    
        if (!user?.permissions?.includes("create")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to create a customer group"
            });
        }

        const {
            name,isParent,parentGroupId,pricelistId,
            creditLimit,creditPeriod,receivableAccount,
            description,skipCreditLimitException
        }=req.body

        if (!name) {
            return res.status(400).json({
                status: 400,
                message: "Customer group name is required."
            });
        }
        if (isParent === false && !parentGroupId) {
            return res.status(400).json({
                status: 400,
                message: "parentGroupId is required when isParent is false."
            });
        }if (pricelistId) {
            const pricelistExists = await pricelists.findByPk(pricelistId);
            if (!pricelistExists) {
                return res.status(400).json({
                    status: 400,
                    message: `Invalid pricelistId: No pricelist found `
                });
            }
        }

        await CustomerGroup.create({
            name,isParent,parentGroupId,pricelistId,
            creditLimit,creditPeriod,receivableAccount,
            description,skipCreditLimitException
        })
        return res.status(200).json({
            status:200,
            message:"Customer group created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}

const getCustomerGroup=async (req,res) => {
    try {
        const group=await CustomerGroup.findAll({
            include:[{
                model:pricelists,
                as:"pricelist"
            }]
        })

        return res.status(200).json({
            status:200,
            message:"Fetching customer groups successfull",
            data:group
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}

const updateCustomerGroup = async (req, res) => {
    try {
        const user = req.user;
        
        if (!user?.permissions?.includes("edit")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to update a customer group"
            });
        }

        const { id } = req.params;
        const updates = req.body;

        const group = await CustomerGroup.findByPk(id);
        if (!group) {
            return res.status(404).json({
                status: 404,
                message: "Customer group not found"
            });
        }

        if (updates.pricelistId) {
            const pricelistExists = await pricelists.findByPk(updates.pricelistId);
            if (!pricelistExists) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid pricelistId: No pricelist found"
                });
            }
        }

        await group.update(updates);
        return res.status(200).json({
            status: 200,
            message: "Customer group updated successfully",
            data: group
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};

const deleteCustomerGroup = async (req, res) => {
    try {
        const user = req.user;
        
        if (!user?.permissions?.includes("delete")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to delete a customer group"
            });
        }

        const { id } = req.params;

        const group = await CustomerGroup.findByPk(id);
        if (!group) {
            return res.status(404).json({
                status: 404,
                message: "Customer group not found"
            });
        }

        await group.destroy();
        return res.status(200).json({
            status: 200,
            message: "Customer group deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};

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
    createCustomerGroup,
    getCustomerGroup,
    updateCustomerGroup,
    deleteCustomerGroup
};
