import Appointment from "../models/appointmentModel.js";
import { Availability } from "../models/adminModel.js";
import { WalletTransaction } from "../models/transactionModel.js";
import User from "../models/userModel.js";

// @desc    Book a new session using Wallet Balance
// @route   POST /api/appointments/book
// @access  Private
export const bookSession = async (req, res) => {
  try {
    const { therapyType, sessionType, timeSlot, availabilityRef, notes } =
      req.body;

    const sessionPrice = Number(process.env.SESSION_PRICE);

    // 1. Check User Wallet Balance
    const user = await User.findById(req.user._id);
    if (!user || user.walletBalance < sessionPrice) {
      return res.status(400).json({
        message: `Insufficient wallet balance. Current: ₹${
          user?.walletBalance || 0
        }. Required: ₹${sessionPrice}`,
      });
    }

    // 2. Atomically find availability and mark slot as booked
    const availability = await Availability.findOneAndUpdate(
      {
        _id: availabilityRef,
        slots: {
          $elemMatch: {
            time: timeSlot,
            isBooked: false,
          },
        },
      },
      { $set: { "slots.$.isBooked": true } },
      { new: true }
    );

    if (!availability) {
      return res
        .status(400)
        .json({ message: "Slot is no longer available or already booked." });
    } else {
      const slotDateTime = new Date(`${availability.date} ${timeSlot}`);
      if (slotDateTime < new Date() || !availability.isActive) {
        // ROLLBACK: If it's in the past, unbook the slot before returning error
        await Availability.updateOne(
          { _id: availabilityRef, "slots.time": timeSlot },
          { $set: { "slots.$.isBooked": false } }
        );
        return res.status(400).json({ message: "Slot is expired" });
      }
    }

    // 3. Deduct balance from User
    user.walletBalance -= sessionPrice;
    await user.save();
    // 4. Create the Appointment
    const appointment = await Appointment.create({
      user: req.user._id,
      availabilityRef,
      therapyType,
      sessionType,
      timeSlot,
      notes,
      isPaid: true,
      status: "confirmed", // Directly confirmed since paid via wallet
    });

    // 5. Create Wallet Transaction History (The Ledger)
    await WalletTransaction.create({
      user: req.user._id,
      amount: sessionPrice,
      type: "debit",
      purpose: "booking",
      status: "completed",
      referenceId: appointment._id, // Link to the appointment
      balanceAfter: user.walletBalance,
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment status (Admin Only)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log(status);
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // If an appointment is rejected, we must refund the user's wallet
    if (appointment.status === "rejected" || appointment.status === "completed") {
      return res.status(400).send("Appointment is already "+appointment.status);
    }
    if (status === "rejected") {
      const user = await User.findById(appointment.user);
      const refundAmount = Number(process.env.SESSION_PRICE); // Match session price

      // Refund logic
      user.walletBalance += refundAmount;
      await user.save();

      // Create Refund History entry
      await WalletTransaction.create({
        user: user._id,
        amount: refundAmount,
        type: "credit",
        purpose: "refund",
        status: "completed",
        referenceId: appointment._id,
        balanceAfter: user.walletBalance,
      });

      await Availability.updateOne(
        {
          _id: appointment.availabilityRef,
          "slots.time": appointment.timeSlot,
        },
        { $set: { "slots.$.isBooked": false } }
      );
    }
    appointment.status = status;
    await appointment.save();
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get logged in user appointments
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("availabilityRef")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) return res.status(400).json({ success: false, message: "Date is required" });

    // 1. Normalize dates
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ success: false, message: "Past dates are invalid" });
    }

    // 2. Find availability for the date
    const availability = await Availability.findOne({ date, isActive: true });

    if (!availability) {
      return res.status(404).json({ success: false, message: "No slots published" });
    }

    // 3. Filter for slots that are NOT booked
    // Based on your schema: slots: [{ time: "9:00 AM", isBooked: false }]
    const availableSlots = availability.slots
      .filter(slot => !slot.isBooked)
      .map(slot => slot.time); // Convert objects back to strings for the frontend

    return res.status(200).json({ 
      success: true,
      data: { slots: availableSlots, availabilityId: availability._id } 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findById(req.params.id);

    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    await availability.deleteOne();
    res.status(200).json({ success: true, message: "Availability deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const flushAvailability = async (req, res) => {
  try {
    // Deleting all availability entries before today
    const today = new Date().toISOString().split("T")[0];
    const result = await Availability.deleteMany({ date: { $lt: today } });

    res.status(200).json({ 
      success: true, 
      message: `Flushed ${result.deletedCount} past availability entries successfully` 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateMeetLink = async (req, res) => {
  try {
    const { meetLink } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    appointment.meetLink = meetLink;
    await appointment.save();
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};