import express from 'express';
import { bookSession, updateStatus, getMyAppointments, getAvailability } from '../controllers/appointmentController.js';
import { protect } from '../middlewares/userMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// middleware to protect routes
router.use(protect);

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: errors.array()[0].msg // Returns the first error message
    });
  }
  next();
};

router.post(
  '/book', 
  [
    body('notes')
      .optional({ checkFalsy: true }) // Notes are usually optional
      .isLength({ max: 50 })
      .withMessage('Notes cannot be longer than 50 characters')
  ],
  validateRequest, 
  bookSession
);

// Admin only route
router.patch('/status/:id', admin, updateStatus);
router.get('/my-sessions', getMyAppointments);
router.get('/get-availability', getAvailability)

export default router;