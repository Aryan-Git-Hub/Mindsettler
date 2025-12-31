import express from 'express';
import { protect } from '../middlewares/userMiddleware.js';
import { getPendingAppointments, setAvailability } from '../controllers/adminController.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// middleware to protect routes
router.use(protect, admin);

// User routes
router.post('/set-availability', setAvailability);
router.get('/pending-appointments', getPendingAppointments);

export default router;