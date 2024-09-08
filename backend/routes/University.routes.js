import express from "express";
import {
  createUniversity,
  deleteUniversity,
  getByFilter,
  getUniversityDetails,
  updateUniversity,
} from "../controllers/University.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/", createUniversity);
router.get("/", getUniversityDetails);
router.delete("/:id", deleteUniversity);
router.patch("/:id", updateUniversity);
router.get("/filter", getByFilter);
export default router;
