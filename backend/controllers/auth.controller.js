import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import User from "../models/authuser.model.js";
export const signup = async (req, res) => {
  const { password, username, confirmPassword, email, full_name } = req.body;
  try {
    const errors = {};
    const users = await User.findBy("username", username);
    const emailUser = await User.findBy("email", email);
    if (password !== confirmPassword) {
      errors["confirmPassword"] = "Passwords don't match";
    } else if (password?.length < 6) {
      errors["password"] = "Password must be at least 6 characters";
    }
    if (users) {
      errors["username"] = "Username already exists";
    }

    if (emailUser) {
      errors["email"] = "Email already exists";
    }
    if (Object.keys(errors)?.length > 0) {
      console.log(errors)
      return res.status(400).json({ errors: errors });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilePic = "male" === "male" ? boyProfilePic : girlProfilePic;
    const newUser = {
      full_name,
      username,
      password: hashedPassword,
      email,
      profile_pic: profilePic,
    };
    const result = await User.create(newUser);
    if (newUser) {
      generateTokenAndSetCookie(result?.id, res);
      res.status(200).send({
        message: "Registration successfull !",
        status: "success",
        id: result?.id,
        fullName: newUser.full_name,
        username: newUser.username,
        profilePic: newUser.profile_pic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );
      if (!user || !isPasswordCorrect) {
        return res
          .status(400)
          .send({ errors: { password: "Incorrect Password" } });
      }
      generateTokenAndSetCookie(user.id, res);
      res.status(200).send({
        message: "Login successfull!",
        status: "success",
        full_name: user.fullName,
        username: user.username,
        profile_pic: user.profile_pic,
      });
    } else {
      return res.status(400).send({
        errors: { username: "No User Found for this name" },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({
      message: "Logged out successfully",
      status: "success",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
