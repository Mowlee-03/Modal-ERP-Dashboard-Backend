const {
    ItemCategory
}=require("../../models")


const CreateItemCategory=async (req,res) => {
    try {
        

        const user = req.user;
    
        if (!user?.permissions?.includes("create")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to create a item group"
            });
        }

        const {
            name
        }=req.body

        if (!name) {
            return res.status(400).json({
                status:400,
                message:"Name is required"
            })
        }

        const existCategory=await ItemCategory.findOne({
            where:{name:name}
        })
        if (existCategory) {
            return res.status(409).json({
                status:409,
                message:"Category already exist"
            })
        }

        await ItemCategory.create({name})

    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"An internal server error",
            error:error.message
        })
    }
}

const ViewItemCategory = async (req, res) => {
    try {
        const categories = await ItemCategory.findAll();
        return res.status(200).json({
            status: 200,
            message: "Item categories fetched successfully",
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};

// Update Item Category
const UpdateItemCategory = async (req, res) => {
    try {
        const user = req.user;
        if (!user?.permissions?.includes("edit")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to update an item category"
            });
        }

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 400,
                message: "Name is required"
            });
        }

        const category = await ItemCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: "Category not found"
            });
        }

        await category.update({ name });
        return res.status(200).json({
            status: 200,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};

// Delete Item Category
const DeleteItemCategory = async (req, res) => {
    try {
        const user = req.user;
        if (!user?.permissions?.includes("delete")) {
            return res.status(403).json({
                status: 403,
                message: "Forbidden: You don't have permission to delete an item category"
            });
        }

        const { id } = req.params;
        const category = await ItemCategory.findByPk(id);
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: "Category not found"
            });
        }

        await category.destroy();
        return res.status(200).json({
            status: 200,
            message: "Category deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "An internal server error",
            error: error.message
        });
    }
};


module.exports={
    CreateItemCategory,
    ViewItemCategory,
    UpdateItemCategory,
    DeleteItemCategory
}