import jwt from "jsonwebtoken";
import User from "../models/authuser.model.js";

const protectRoute = async (req, res, next) => {
  try {
    console.log(req.cookies.jwt)
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    console.log("verified");
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
