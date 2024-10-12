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
router.post("/",protectRoute, createUniversity);
router.get("/", protectRoute,getUniversityDetails);
router.delete("/:id",protectRoute, deleteUniversity);
router.patch("/:id", protectRoute,updateUniversity);
router.get("/filter",protectRoute, getByFilter);
export default router;
