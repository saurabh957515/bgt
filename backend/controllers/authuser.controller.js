// import { create } from "../models/authuser.model";
// Create and Save a new Tutorial
import sql from "../db/queryExecution.js";
export async function createRoute(req, res) {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Create a Tutorial
  const user = {
    full_name: req?.body.full_name,
    username: req?.body.username,
    password: req?.body.password,
    profile_pic: req?.body.profile_pic ?? null,
    email: req?.body.email,
  };

  // Save Tutorial in the database
  try {
    const result = await sql("INSERT INTO users SET ?", user);
    res.send({ id: result.insertId, ...user });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
  //   create(user, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while creating the user.",
  //       });
  //     else res.send(data);
  //   });
}

// export default user
