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
router.post("/", createAdmission);
router.get("/", getAdmissionDetail);
router.delete("/:id", deleteAdmission);
router.patch("/:id", updateAdmission);
router.get("/filter", getByFilter);
router.get("/getall", getAllDetails);
export default router;
