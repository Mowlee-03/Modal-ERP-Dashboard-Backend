const {}=require("../../models")


const createPartner=async (req,res) => {
    const user=req.user
    // Check if the user has the 'create' permission
    if (!user?.permissions?.includes("create")) {
       return res.status(403).json({
           status: 403,
           message: "Forbidden: You don't have permission to create currency."
       });
   }

   try {
    const {
        name,isCompany,customer,supplier,competitor,transporter,transporterId,//partnerdetails
        legalName,territoryId,website,industry,remarks,//generaldetails
        gstRegistrationType,gstin,panNo,tanNo,cinNo,supplierCode,msmeRegType,udayamRegNo,msmeRegisteredDate,//legaldetails
        title,contact_name,designation,email,phone,mobile,fax,contact_remarks,//contact
        
    }=req.body

    
   } catch (error) {
    return res.status(500).json({
        status:500,
        message:"An error accured",
        error:error.message
    })
   }

}