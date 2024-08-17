// import { create } from "../models/authuser.model";
// Create and Save a new Tutorial
import sql from "../db/queryExecution.js";
export async function createRoute(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const user = {
    full_name: req?.body.full_name,
    username: req?.body.username,
    password: req?.body.password,
    profile_pic: req?.body.profile_pic ?? null,
    email: req?.body.email,
  };

  try {
    const result = await sql("INSERT INTO users SET ?", user);
    res.send({ id: result.insertId, ...user });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
