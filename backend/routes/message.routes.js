import express from 'express';
import { sendSingleMessage, sendMassMessage, getMessages } from '../controllers/Message.controller.js';

const router = express.Router();

router.post('/send-whatsapp', sendSingleMessage);
router.post('/send-whatsapp-mass', sendMassMessage);
router.get('/messages', getMessages);
export default router;
