const {
    BillOfMaterials,
    BomComponentDetails,
    sequelize
}=require("../../../models")


const CreateBillofMaterials=async (req,res) => {

    const { BomName, itemId, remarks,isDefault,componentsDetails } = req.body;

    if (!Array.isArray(componentsDetails)) {
        return res.status(400).json({
            status: 400,
            message: "Components details must be sent as an array",
        });
    }

    const transaction = await sequelize.transaction();
    try {
        const isExistBom = await BillOfMaterials.findOne({ where: { BomName } });
        if (isExistBom) {
            await transaction.rollback();
            return res.status(409).json({
                status: 409,
                message: "BOM already exists, try a different name",
            });
        }


        const BOM = await BillOfMaterials.create({ BomName,itemId,remarks,isDefault }, { transaction });


        if (componentsDetails.length > 0) {
            const components = componentsDetails.map(components => ({
                BomId:BOM.id,
                itemId:components.itemId,
                description:components.description,
                quantity:components.quantity,
                uom:components.uom,
                locationRemarks:components.locationRemarks
            }));

            await BomComponentDetails.bulkCreate(components, { transaction });
        }

        await transaction.commit();
        return res.status(200).json({
            status: 200,
            message: "BillofMaterials created successfully",
        });
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}


module.exports={
    CreateBillofMaterials,

}