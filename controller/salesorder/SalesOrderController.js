const {SalesOrder,SoBillingDetails,SoDeliveryDetails,SalesOrderItem,sequelize}=require("../../models")



const CREATE_SALES_ORDER=async (req,res) => {
    const user = req.user;
    
    if (!user?.permissions?.includes("create")) {
        return res.status(403).json({
            status: 403,
            message: "Forbidden: You don't have permission to create a partner."
        });
    }

    const {
        orderDate,quoteId,customerId,customerPoNumber,customerPoDate,salesPerson,territoryId,remarks,additionalCharges,totalAmount,amountWithTax,roundOffMethod,finalAmountDollar,finalAmountInr,termsAndConditions,//SalesOrder
        currencyId,priceListId,paymentTerms,creditPeriod,frieghtName,defaultTax,billingContact,billingAddress,//SoBillingDetails,salesOrderId
        deliveryPolicy,deliveryDate,warehouseId,consignee,modeOfDispatch,deliveryContact,deliveryAddress,//SoDeliveryDetails,salesOrderId
        
        items//SalesOrderItems
    }=req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ status: 400, message: "At least one item is required." });
    }

    try {
        // Start transaction
        const transaction = await sequelize.transaction();

        // Step 1: Create Sales Order
        const salesOrder = await SalesOrder.create({
            orderDate, quoteId, customerId, customerPoNumber, customerPoDate, salesPerson, territoryId, remarks, 
            additionalCharges, totalAmount, amountWithTax, roundOffMethod, finalAmountDollar, finalAmountInr, 
            termsAndConditions
        }, { transaction });

        const salesOrderId = salesOrder.id;

        // Step 2: Create Billing Details (Optional)
        await SoBillingDetails.create({
            salesOrderId,
            currencyId, priceListId, paymentTerms, creditPeriod, frieghtName, defaultTax, billingContact, billingAddress
        }, { transaction });

        await SoDeliveryDetails.create({
            salesOrderId,
            deliveryPolicy,deliveryDate,warehouseId,consignee,modeOfDispatch,deliveryContact,deliveryAddress
        },{transaction})
        // Step 3: Add Multiple Items to Sales Order
        const orderItems = items.map(item => ({
            salesOrderId,
            itemId: item.itemId,
            description: item.description,
            quantity: item.quantity,
            uom: item.uom,
            rate: item.rate,
            discount: item.discount || 0,
            tax: item.tax || 0,
            amount: item.amount,
            warehouse: item.warehouse,
            deliveryDate: item.deliveryDate,
            displayGroup: item.displayGroup || "",
            remarks: item.remarks || ""
        }));

        await SalesOrderItem.bulkCreate(orderItems, { transaction });

        // Commit transaction
        await transaction.commit();

        return res.status(201).json({
            status: 201,
            message: "Sales order created successfully.",
            salesOrder
        });
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An error accured",
            error:error.message
        })
    }

}


module.exports={
    CREATE_SALES_ORDER
}