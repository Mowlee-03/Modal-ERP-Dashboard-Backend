const { sequelize } = require("../../models");
const {
    Partner, PartnerGeneralDetails, PartnerLegalDetails,
    Contact, CustomerDetails, SupplierDetails
} = require("../../models");

const createPartner = async (req, res) => {
    const user = req.user;
    
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a partner."
        });
    }

    const {
        name, isCompany, customer, supplier, competitor, transporter, transporterId,
        legalName, territoryId, website, industry, remarks,
        gstRegistrationType, gstin, panNo, tanNo, cinNo, supplierCode, msmeRegType, udayamRegNo, msmeRegisteredDate,
        title, contact_name, designation, email, phone, mobile, fax, contact_remarks,
        customerGroupId, salesPerson, collectionPerson, pricelistId, creditPeriod, creditLimit, receivableAccount, paymentTerms, modeOfDispatch, freight,
        payableAccount, purchaseCreditPeriod, purchasePriceListId, purchasePaymentTerms
    } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 400,
            message: "Partner name is required."
        });
    }

    if (!customer && !supplier) {
        return res.status(400).json({
            status: 400,
            message: "Either customer or supplier must be true to create a partner."
        });
    }

    const transaction = await sequelize.transaction();
    try {
        const partner = await Partner.create({
            name, 
            isCompany, 
            customer, 
            supplier, 
            competitor, 
            transporter, 
            transporterId
        }, { transaction });

        let generalDetails;
        if (legalName) {
            generalDetails = await PartnerGeneralDetails.create({
                partnerId: partner.id, 
                legalName,
                territoryId,
                website, 
                industry, 
                remarks
            }, { transaction });
        }

        await PartnerLegalDetails.create({
            partnerId: partner.id, gstRegistrationType, 
            gstin, panNo, tanNo, cinNo, 
            supplierCode, msmeRegType, udayamRegNo, 
            msmeRegisteredDate
        }, { transaction });

        await Contact.create({
            partnerId: partner.id, title, 
            name:contact_name, designation, 
            email, phone, mobile, fax, remarks:contact_remarks
        }, { transaction });

        if (customer) {
            await CustomerDetails.create({
                customerId: partner.id, customerGroupId, 
                salesPerson, collectionPerson, pricelistId, 
                creditPeriod, creditLimit, receivableAccount, 
                paymentTerms, modeOfDispatch, freight
            }, { transaction });
        }

        if (supplier) {
            await SupplierDetails.create({
                supplierId: partner.id, payableAccount, 
                purchaseCreditPeriod, purchasePriceListId, 
                purchasePaymentTerms
            }, { transaction });
        }

        await transaction.commit();

        return res.status(200).json({
            status: 200,
            message: "Partner created successfully",
            partner
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message:"An error occurred",
            error: error.message
        });
    }
};

module.exports = { createPartner };
