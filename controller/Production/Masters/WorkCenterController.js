const {WorkCenters}=require("../../../models")



const CreateWorkCenter=async (req,res) => {
    try {
        const {name,startTime,endTime,hourlyCost,remarks}=req.body

        const isExistWrokcenter=await WorkCenters.findOne({where:{name:name}})
        if (isExistWrokcenter) {
            return res.status(409).json({
                status:409,
                message:"WorkCenter already exist try diffrent name"
            })
        }

        await WorkCenters.create({name,startTime,endTime,hourlyCost,remarks})
        return res.status(200).json({
            status:200,
            message:"WorkCenter created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }


}


const GetWorkCenters=async (req,res) => {
    try {
        const response=await WorkCenters.findAll()
        return res.status(200).json({
            status:200,
            message:"Fetching WorkCenters successfully",
            data:response
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}


const UpdateWorkCenter=async (req,res) => {
    try {
        const {id}=req.params
        const updates=req.body
        const workcenter=await WorkCenters.findByPk(id)

        if (!workcenter) {
            return res.status(404).json({
                status:404,
                message:"WorkCenter not found"
            })
        }

        await workcenter.update(updates)

        return res.status(200).json({
            status:200,
            message:"WorkCenter update successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}


const DeleteWorkCenter=async (req,res) => {
    try {
        const {id}=req.params
        const workcenter=await WorkCenters.findByPk(id)

        if (!workcenter) {
            return res.status(404).json({
                status:404,
                message:"WorkCenter not found"
            })
        }

        await workcenter.destroy()

        return res.status(200).json({
            status:200,
            message:"WorkCenter deleted successfully"
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
    CreateWorkCenter,
    GetWorkCenters,
    UpdateWorkCenter,
    DeleteWorkCenter
}