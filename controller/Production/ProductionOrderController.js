const {
    ProductionOrder, ProductTobeFinish,
    ProdRawMatDetail, ProductionProcessDetail, sequelize,
    Partner,SalesOrder,Warehouses,Routings,ItemMaster,BillOfMaterials,
    ProductionProcesses,WorkCenters
} = require("../../models");

const CreateProductionOrder = async (req, res) => {
    const {
        orderType, orderDate, customerId, salesOrderId,materialWarehouseId, FGwarehouseId,
        routingId, plannedStartDate, plannedEndDate,actualStartDate, actualEndDate, remarks,//Schedule Details

        productsTobeFinishing, prodRawMatDetails, productionProcessDetails
    } = req.body;

    // Basic validation
    if (!orderType || !orderDate || !materialWarehouseId || !FGwarehouseId) {
        return res.status(400).json({
            status: 400,
            message: "Missing required fields: orderType, orderDate, materialWarehouseId, FGwarehouseId"
        });
    }

    if (!Array.isArray(productsTobeFinishing) || !Array.isArray(prodRawMatDetails) || !Array.isArray(productionProcessDetails)) {
        return res.status(400).json({
            status: 400,
            message: "productsTobeFinishing, prodRawMatDetails, and productionProcessDetails must be arrays"
        });
    }

    const transaction = await sequelize.transaction();

    try {
        const Order = await ProductionOrder.create({
            orderType, orderDate, customerId, salesOrderId,materialWarehouseId, FGwarehouseId,
        routingId, plannedStartDate, plannedEndDate,actualStartDate, actualEndDate, remarks,
        },{transaction}) 

        const productTobeFinish=productsTobeFinishing.map(data=>({
            PrdOrdId:Order.id,
            itemId:data.itemId,
            quantity:data.quantity,
            uom:data.uom,
            BomId:data.BomId,
            type:data.type,
            valuationFactor:data.valuationFactor,
            remarks:data.remarks
        }))
        await ProductTobeFinish.bulkCreate(productTobeFinish,{transaction})

        const rawmaterials=prodRawMatDetails.map(data=>({
            PrdOrdId:Order.id,
            itemId:data.itemId,
            description:data.description,
            applicableFor:data.applicableFor,
            quantity:data.quantity,
            uom:data.uom,

        }))

        await ProdRawMatDetail.bulkCreate(rawmaterials,{transaction})

        const proceesdetails=productionProcessDetails.map(data=>({
            PrdOrdId:Order.id,
            processId:data.processId,
            workcenterId:data.workcenterId,
            operatorName:data.operatorName,
            plannedStartTime:data.plannedStartTime,
            plannedEndTime:data.plannedEndTime,
            actualStartTime:data.actualStartTime,
            actualEndTime:data.actualEndTime,
            plannedDuration:data.plannedDuration,
            actualDuration:data.actualDuration
        }))
        await ProductionProcessDetail.bulkCreate(proceesdetails,{transaction})
        await transaction.commit();
        return res.status(201).json({
            status: 201,
            message: "Production order created successfully"
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};

const getProductionOrder=async (req,res) => {
    try {
        const {id}=req.params
        
        const ProdOrder = await ProductionOrder.findOne({
            where: { id },
            include: [
                { 
                    model: Partner, 
                    as: "customer",
                    attributes: ["id", "name"] 
                },
                { 
                    model: SalesOrder, 
                    as: "salesOrder",
                    attributes: ["id", "soId"] 
                },
                { 
                    model: Warehouses,
                    as: "materialWarehouse",
                    attributes: ["id", "name"]
                },
                { 
                    model: Warehouses, 
                    as: "FGwarehouse",
                    attributes: ["id", "name"] 
                },
                { 
                    model: Routings,
                    as: "routing",
                    attributes: ["id", "name"]
                },
                { 
                    model: ProductTobeFinish, 
                    as: "productsTobeFinishing",
                    attributes: ["id", "itemId","quantity","uom","BomId"],
                    include:[
                        {
                            model:ItemMaster,
                            as:'item',
                            attributes: ["id", "name","baseUOM"]
                        },
                        {
                            model:BillOfMaterials,
                            as:"BillofMaterials",
                            attributes: ["id", "BomName",]
                        }
                    ] 
                },
                { 
                    model: ProdRawMatDetail, 
                    as: "rawMaterialsDetails",
                    attributes: ["id", "description","quantity","uom"],
                    include:[
                        {
                            model:ItemMaster,
                            as:"rawmaterial",
                            attributes: ["id", "name","baseUOM"]
                        }
                    ] 
                },
                { 
                    model: ProductionProcessDetail, 
                    as: "productionProcessDetails",
                    include:[
                        {
                            model:ProductionProcesses,
                            as:"process",
                            attributes: ["id", "name"]
                        },
                        {
                            model:WorkCenters,
                            as:"workcenter",
                            attributes: ["id", "name"]
                        }
                    ]
                 }
            ]
        });
        if (!ProdOrder) {
            return res.status(404).json({
                status: 404,
                message: "Order not found"
            });
        }
        
        return res.status(200).json({
            status:200,
            message:"Fetching PROD/ORDER Success",
            data:ProdOrder
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}
module.exports={
    CreateProductionOrder,
    getProductionOrder
}