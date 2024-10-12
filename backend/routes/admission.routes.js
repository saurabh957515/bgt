import express from "express";
import {
  createAdmission,
  getAdmissionDetail,
  updateAdmission,
  deleteAdmission,
  getByFilter,
  getAllDetails
} from "../controllers/Admissions.controller.js";

import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/",protectRoute, createAdmission); 
router.get("/",protectRoute, getAdmissionDetail);
router.delete("/:id",protectRoute, deleteAdmission);
router.patch("/:id", protectRoute,updateAdmission);
router.get("/filter", protectRoute,getByFilter);
router.get("/getall",protectRoute, getAllDetails);
export default router;
