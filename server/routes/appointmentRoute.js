import express from 'express';
import { bookSession, getMyAppointments, updateStatus } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/userMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// middleware to protect routes
router.use(protect);
// User routes
router.post('/book', bookSession);
router.get('/my-sessions', getMyAppointments);

// Admin only route (You'll need an admin check middleware)
router.patch('/status/:id', admin, updateStatus);

export default router;