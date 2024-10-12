import jwt from "jsonwebtoken";
import User from "../models/authuser.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log('token',token);
    if (!token) {
      return res
        .status(401).render("unauthorized")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('decoding')
    if (!decoded) {
      return res.status(401).render("unauthorized")
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('verified')
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
