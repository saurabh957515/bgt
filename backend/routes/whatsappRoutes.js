import express from "express";
import {
  storeMessage,
  getConversationById,
  getConversationByParticipants,
} from "../controllers/WhatsAppConversationController.js";

const router = express.Router();

router.post("/message", storeMessage); // Store a new WhatsApp message
router.get("/conversation/:conversation_id", getConversationById); // Get conversation by ID
router.get("/conversation", getConversationByParticipants); // Get conversation by participants

export default router;
