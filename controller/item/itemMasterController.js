const {
    ItemMaster, ItemSettings, ItemAccountDetails,
    ItemServiceDetails, PurchaseItemDetails, SalesItemDetails
} = require("../../models");

const { sequelize } = require("../../models");

const CREATE_ITEM = async (req, res) => {
    const user = req.user;

    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create an item."
        });
    }

    const {
        name, description, itemType, categoryId, groupId, baseUOM, barCode, partCode, warranty, componentLocation,

        trackStock, salesItem, purchaseItem, productionItem, bomType, defaultRouting, enableSerialNumber,
        autoGenerateSerialNo, serialNoFormat, serialNoCurrentValue, enableBatch, enableSalesKit, useBillingUOM,
        billingUOM, allowBackOrder, useForCasualLabour, useForInternalLabour, activityType, useForOandM,

        hsnCode, salesTax, purchaseTax, salesAccount, purchaseAccount, tariffCode, commodityCode,

        serviceableEquipment, enableSpareWarranty, warrantyDuration, installationApplicable, warrantyApplicable,
        defaultWarrantyContract, warrantyBasedOn,

        defaultPurchaseCost, landingCostMultiple, purchaseUOM, safetyStock, reorderQty, leadTime, supplierId,
        recommendedSellingPrice, minimumSellingPrice, salesUOM,
    } = req.body;

    // Required field validations
    if (!name || !description || !itemType || !baseUOM) {
        return res.status(400).json({
            status: 400,
            message: "Name, Description, Item Type, and Base UOM are required fields."
        });
    }



    const transaction = await sequelize.transaction();

    try {
        // Create Item Master
        const newItem = await ItemMaster.create({
            name, description, itemType, categoryId, groupId, baseUOM, barCode, partCode, warranty, componentLocation
        }, { transaction });

        // Create Item Settings
        await ItemSettings.create({
            itemId: newItem.id, trackStock, salesItem, purchaseItem, productionItem, 
            bomType, defaultRouting,enableSerialNumber, autoGenerateSerialNo, serialNoFormat, 
            serialNoCurrentValue,enableBatch, enableSalesKit,useBillingUOM, billingUOM, 
            allowBackOrder, useForCasualLabour, useForInternalLabour, activityType, useForOandM
        }, { transaction });

        // Create Item Account Details
        await ItemAccountDetails.create({
            itemId: newItem.id, hsnCode, salesTax, purchaseTax, salesAccount, purchaseAccount, 
            tariffCode, commodityCode
        }, { transaction });

        // Create Item Service Details
        await ItemServiceDetails.create({
            itemId: newItem.id, serviceableEquipment, enableSpareWarranty, warrantyDuration, 
            installationApplicable,warrantyApplicable, defaultWarrantyContract, warrantyBasedOn
        }, { transaction });

        // Conditionally create Purchase Item Details
        if (purchaseItem && purchaseUOM) {
            await PurchaseItemDetails.create({
                itemId: newItem.id, defaultPurchaseCost, landingCostMultiple, purchaseUOM, safetyStock, 
                reorderQty, leadTime, supplierId
            }, { transaction });
        }

        // Conditionally create Sales Item Details
        if (salesItem && salesUOM) {
            await SalesItemDetails.create({
                itemId: newItem.id, recommendedSellingPrice, minimumSellingPrice, salesUOM
            }, { transaction });
        }

        await transaction.commit();

        return res.status(201).json({
            status: 201,
            message: "Item created successfully.",
            item: newItem
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message: "An error occurred.",
            error: error.message
        });
    }
};

module.exports = { CREATE_ITEM };
