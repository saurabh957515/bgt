import express from "express";
import { createEducation,updateEducation ,getEducationDetails,getByFilter, deleteEducation} from "../controllers/Education.controller.js";

const router = express.Router();
router.post("/", createEducation);
router.get("/", getEducationDetails);
router.delete("/:id", deleteEducation);
router.patch("/:id", updateEducation);
router.get("/filter", getByFilter);
router.get("/all", getByFilter);
export default router;
