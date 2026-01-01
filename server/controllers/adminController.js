import { Availability } from '../models/adminModel.js';
import Appointment from '../models/appointmentModel.js';

/**
 * @desc    Create/Update availability slots for a specific date
 * @route   POST /api/admin/availability
 * @access  Private/Admin
 */

export const setAvailability = async (req, res) => {
    try {
        const { date, slots } = req.body;

        // Format slots into the object structure required by the schema
        const formattedSlots = slots.map(time => ({
            time,
            isBooked: false
        }));

        // Update existing date or create new one (upsert)
        const availability = await Availability.findOneAndUpdate(
            { date },
            { slots: formattedSlots, isActive: true },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, data: availability });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Get all appointments for Admin view
 * @route   GET /api/admin/appointments
 * @access  Private/Admin
 */
export const getPendingAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ status:"confirmed" })
            .populate('user', 'name email')
            .sort({ date: 1, timeSlot: 1 });

        res.status(200).json({ success: true, count:appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};