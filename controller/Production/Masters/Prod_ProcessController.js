const {ProductionProcesses}=require("../../../models")



const CreateProcess=async (req,res) => {
    try {
        const {name,displayOrder}=req.body

        const isExistProcess=await ProductionProcesses.findOne({where:{name:name}})
        if (isExistProcess) {
            return res.status(409).json({
                status:409,
                message:"Process already exist try diffrent name"
            })
        }

        await ProductionProcesses.create({name,displayOrder})
        return res.status(200).json({
            status:200,
            message:"Process created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }


}


const GetProcess=async (req,res) => {
    try {
        const response=await ProductionProcesses.findAll()
        return res.status(200).json({
            status:200,
            message:"Fetching Process successfully",
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

const UpdateProcess=async (req,res) => {
    try {
        const {id}=req.params
        const updates=req.body
        const process=await ProductionProcesses.findByPk(id)

        if (!process) {
            return res.status(404).json({
                status:404,
                message:"Process not found"
            })
        }

        await process.update(updates)

        return res.status(200).json({
            status:200,
            message:"Process update successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}
const DeleteProcess=async (req,res) => {
    try {
        const {id}=req.params
        const process=await ProductionProcesses.findByPk(id)

        if (!process) {
            return res.status(404).json({
                status:404,
                message:"Process not found"
            })
        }

        await process.destroy()

        return res.status(200).json({
            status:200,
            message:"Process deleted successfully"
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
    CreateProcess,
    GetProcess,
    UpdateProcess,
    DeleteProcess
}