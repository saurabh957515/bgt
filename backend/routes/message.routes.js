import express from 'express';
import { sendSingleMessage, sendMassMessage, getMessages } from '../controllers/Message.controller.js';

const router = express.Router();

// Route to send a single WhatsApp message
router.post('/send-whatsapp', sendSingleMessage);

// Route to send a mass WhatsApp message
router.post('/send-whatsapp-mass', sendMassMessage);
router.get('/messages', getMessages);
export default router;
