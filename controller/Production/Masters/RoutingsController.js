const { Routings, RoutingProcessDetails,ProductionProcesses,WorkCenters, sequelize } = require("../../../models");

const CreateRouting = async (req, res) => {
    const { name, remarks, routingProcessDetails } = req.body;

    if (!Array.isArray(routingProcessDetails)) {
        return res.status(400).json({
            status: 400,
            message: "Process details must be sent as an array",
        });
    }

    const transaction = await sequelize.transaction();
    try {
        const isExistRouting = await Routings.findOne({ where: { name } });
        if (isExistRouting) {
            await transaction.rollback();
            return res.status(409).json({
                status: 409,
                message: "Routing already exists, try a different name",
            });
        }

        // Create Routing Entry
        const routing = await Routings.create({ name, remarks }, { transaction });

        // If process details are provided, insert them
        if (routingProcessDetails.length > 0) {
            const processes = routingProcessDetails.map(process => ({
                routingId: routing.id,
                processId: process.processId,
                workcenterId: process.workcenterId,
                setupTime: process.setupTime,
                processTime: process.processTime,
                duration: process.duration,
            }));

            await RoutingProcessDetails.bulkCreate(processes, { transaction });
        }

        await transaction.commit();
        return res.status(200).json({
            status: 200,
            message: "Routing created successfully",
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message: "An internal server error occurred",
            error: error.message,
        });
    }
};

// Get All Routings with Details
const GetAllRoutings = async (req, res) => {
    try {
        const routings = await Routings.findAll(
        //     {
        //     include: [
        //         {
        //             model: RoutingProcessDetails,
        //             as: "processDetails",
        //             include: [
        //                 { model: WorkCenters, as: "workcenter" },
        //                 { model: ProductionProcesses, as: "process" }
        //             ]
        //         }
        //     ]
        // }
    );

        return res.status(200).json({
            status: 200,
            message: "Routings fetched successfully",
            data: routings
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred while fetching routings",
            error: error.message
        });
    }
};


// Get Routing by ID
const GetRoutingById = async (req, res) => {
    const { id } = req.params;

    try {
        const routing = await Routings.findByPk(id, {
            include: [
                {
                    model: RoutingProcessDetails,
                    as: "processDetails",
                    include: [
                        { model: WorkCenters, as: "workcenter" },
                        { model: ProductionProcesses, as: "process" }
                    ]
                }
            ]
        });

        if (!routing) {
            return res.status(404).json({
                status: 404,
                message: "Routing not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Routing fetched successfully",
            data: routing
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An error occurred while fetching routing",
            error: error.message
        });
    }
};


const UpdateRouting = async (req, res) => {
    const { id } = req.params;
    const { name, remarks, routingProcessDetails } = req.body;

    if (!Array.isArray(routingProcessDetails)) {
        return res.status(400).json({
            status: 400,
            message: "Process details must be sent as an array",
        });
    }

    const transaction = await sequelize.transaction();
    try {
        const routing = await Routings.findByPk(id);

        if (!routing) {
            await transaction.rollback();
            return res.status(404).json({
                status: 404,
                message: "Routing not found",
            });
        }

        // Update Routing Information
        await routing.update({ name, remarks }, { transaction });

        // Remove existing RoutingProcessDetails for this Routing
        await RoutingProcessDetails.destroy({ where: { routingId: id }, transaction });

        // Insert new RoutingProcessDetails
        if (routingProcessDetails.length > 0) {
            const processes = routingProcessDetails.map(process => ({
                routingId: id,
                processId: process.processId,
                workcenterId: process.workcenterId,
                setupTime: process.setupTime,
                processTime: process.processTime,
                duration: process.duration,
            }));

            await RoutingProcessDetails.bulkCreate(processes, { transaction });
        }

        await transaction.commit();
        return res.status(200).json({
            status: 200,
            message: "Routing updated successfully",
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message: "An internal server error occurred",
            error: error.message,
        });
    }
};


const DeleteRouting = async (req, res) => {
    const { id } = req.params;

    const transaction = await sequelize.transaction();
    try {
        const routing = await Routings.findByPk(id);

        if (!routing) {
            await transaction.rollback();
            return res.status(404).json({
                status: 404,
                message: "Routing not found",
            });
        }

        // Delete all RoutingProcessDetails for this Routing
        await RoutingProcessDetails.destroy({ where: { routingId: id }, transaction });

        // Delete Routing
        await routing.destroy({ transaction });

        await transaction.commit();
        return res.status(200).json({
            status: 200,
            message: "Routing deleted successfully",
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            status: 500,
            message: "An internal server error occurred",
            error: error.message,
        });
    }
};


module.exports={
    CreateRouting,
    GetAllRoutings,
    GetRoutingById,
    UpdateRouting,
    DeleteRouting
}