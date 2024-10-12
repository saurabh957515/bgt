import express from 'express';
import { sendSingleMessage, sendMassMessage, getMessages } from '../controllers/Message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/send-whatsapp',protectRoute, sendSingleMessage);
router.post('/send-whatsapp-mass', protectRoute,sendMassMessage);
router.get('/messages',protectRoute, getMessages);
export default router;
