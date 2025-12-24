import express from 'express';
import { bookSession, getMyAppointments, updateStatus } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/userMiddleware.js';
import { consultant } from '../middlewares/consultantMiddleware.js';

const router = express.Router();

// middleware to protect routes
router.use(protect);
// User routes
router.post('/book', bookSession);
router.get('/my-sessions', getMyAppointments);

// Consultant only route
router.patch('/status/:id', consultant, updateStatus);

export default router;