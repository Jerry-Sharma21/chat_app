import express from 'express';

import protectRoute from '../middleware/protectRoute';
import { getMessages, sendMessage } from '../controllers/message.controller';

const router = express.Router();

// Define route for getting messages by ID
router.get('/:id', protectRoute, getMessages);

// Define route for sending a message by ID
router.post('/send/:id', protectRoute, sendMessage);

export default router;
