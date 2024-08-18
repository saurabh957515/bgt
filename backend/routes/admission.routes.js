import express from "express";
import {
  createAdmission,
  getAdmissionDetail,
  updateAdmission,
  deleteAdmission,
  getByFilter
} from "../controllers/Admissions.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/", createAdmission);
router.get("/", getAdmissionDetail);
router.delete("/:id", deleteAdmission);
router.patch("/:id", updateAdmission);
router.get("/filter", getByFilter);
export default router;
