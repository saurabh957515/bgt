import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, 
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // More relaxed in development
      secure: process.env.NODE_ENV === "production", // Only secure in production (HTTPS)
    });
  } catch (error) {
    console.error("errors in generate tokken", error);
  }
};

export default generateTokenAndSetCookie;
