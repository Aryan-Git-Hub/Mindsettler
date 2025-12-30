import mongoose from "mongoose";

/**
 * Tracks specific booking details. Payment info is linked via WalletTransaction.
 */
const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availabilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
      required: true,
    },
    therapyType: { type: String, required: true },
    sessionType: { 
      type: String, 
      enum: ["online", "offline"], 
      required: true 
    },
    timeSlot: { type: String, required: true },
    notes: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "completed"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false, // Will be set to true immediately if paid via Wallet
    },
    walletTransactionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletTransaction"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);