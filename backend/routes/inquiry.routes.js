import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getByFilter,
  getEnums,
  getInquiry,
  updateInquiry,
} from "../controllers/Inquiry.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/",protectRoute, createInquiry);
router.get("/", protectRoute,getInquiry);
router.delete("/:id",protectRoute, deleteInquiry);
router.patch("/:id",protectRoute, updateInquiry);
router.get("/filter", protectRoute,getByFilter);
router.get("/enum-values/:table/:column",protectRoute, getEnums);
export default router;
