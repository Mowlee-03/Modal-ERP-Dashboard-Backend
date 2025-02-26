const { verifyToken } = require("../utils/token");
const Model=require("../models")
const Usercontroller =Model.User

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Get the token from the cookie


    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decodedUser = verifyToken(token); // Verify and decode token


    if (!decodedUser || !decodedUser.id) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const foundedUser=await Usercontroller.findOne({
      where:{id:decodedUser.id}
    })
    if (!foundedUser) {
        return res.status(404).json({message:"User Not Found"})
    }
    // Attach user details to `req.user`
    req.user = { 
      id: foundedUser.id,
      username:foundedUser.username
    };

    next(); // Proceed to next middleware/controller
  } catch (error) {
    console.log(error);
    
    res.status(401).json({ message: "Unauthorized request." });
  }
};

module.exports = authMiddleware;
