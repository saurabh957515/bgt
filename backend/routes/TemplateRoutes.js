import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../controllers/TemplateController.js";

const router = express.Router();

router.post("/", createTemplate); // Create a new template
router.get("/", getAllTemplates); // Get all templates
router.get("/:id", getTemplateById); // Get a single template by ID
router.put("/:id", updateTemplate); // Update a template
router.delete("/:id", deleteTemplate); // Delete a template

export default router;
