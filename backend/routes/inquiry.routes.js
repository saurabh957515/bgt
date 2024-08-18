import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getByFilter,
  getInquiry,
  updateInquiry,
} from "../controllers/Inquiry.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/", createInquiry);
router.get("/", getInquiry);
router.delete("/:id", deleteInquiry);
router.patch("/:id", updateInquiry);
router.get("/filter", getByFilter);
export default router;
