const {
    BillOfMaterials,
    BomComponentDetails,
    ItemMaster,
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


const GetBillOfMaterials = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const bom = await BillOfMaterials.findOne({
                where: { id },
                include: [{
                    model:BomComponentDetails,
                    as:"componentsDetails",
                    include:[{
                        model:ItemMaster,
                        as:"component"
                    }]
                }]
            });

            if (!bom) {
                return res.status(404).json({ status: 404, message: "BOM not found" });
            }

            return res.status(200).json({ status: 200, data: bom });
        }

        const allBoms = await BillOfMaterials.findAll({
            include: [{model:BomComponentDetails,as:"componentsDetails"}]
        });

        return res.status(200).json({ status: 200, data: allBoms });

    } catch (error) {
        return res.status(500).json({ status: 500, message: "An internal server error", error: error.message });
    }
};

const UpdateBillOfMaterials = async (req, res) => {
    const { id } = req.params;
    const { BomName, itemId, remarks, isDefault, componentsDetails } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const bom = await BillOfMaterials.findByPk(id);

        if (!bom) {
            await transaction.rollback();
            return res.status(404).json({ status: 404, message: "BOM not found" });
        }

        await bom.update({ BomName, itemId, remarks, isDefault }, { transaction });

        if (Array.isArray(componentsDetails)) {
            // First delete old components
            await BomComponentDetails.destroy({ where: { BomId: id }, transaction });

            // Then add updated ones
            const newComponents = componentsDetails.map(component => ({
                BomId: id,
                itemId: component.itemId,
                description: component.description,
                quantity: component.quantity,
                uom: component.uom,
                locationRemarks: component.locationRemarks
            }));

            await BomComponentDetails.bulkCreate(newComponents, { transaction });
        }

        await transaction.commit();

        return res.status(200).json({ status: 200, message: "BOM updated successfully" });

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ status: 500, message: "An internal server error", error: error.message });
    }
};


const DeleteBillOfMaterials = async (req, res) => {
    const { id } = req.params;

    const transaction = await sequelize.transaction();

    try {
        const bom = await BillOfMaterials.findByPk(id);

        if (!bom) {
            await transaction.rollback();
            return res.status(404).json({ status: 404, message: "BOM not found" });
        }

        await BomComponentDetails.destroy({ where: { BomId: id }, transaction });
        await bom.destroy({ transaction });

        await transaction.commit();

        return res.status(200).json({ status: 200, message: "BOM deleted successfully" });

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ status: 500, message: "An internal server error", error: error.message });
    }
};


module.exports={
    CreateBillofMaterials,
    GetBillOfMaterials,
    UpdateBillOfMaterials,
    DeleteBillOfMaterials
}