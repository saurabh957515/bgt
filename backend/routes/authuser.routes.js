import { createRoute } from "../controllers/authuser.controller.js";
import express from "express";
const router = express.Router();
router.post("/",createRoute);
export default router;
