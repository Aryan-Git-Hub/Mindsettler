import mongoose from "mongoose";

// 1. Transaction Schema: Records all wallet transactions (top-ups and bookings)
const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
    transactionId: { type: String, unique: true, sparse: true }, // UPI Ref for top-ups
  },
  { timestamps: true }
);

const walletTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"], // credit = money in, debit = money out
      required: true,
    },
    purpose: {
      type: String,
      enum: ["topup", "booking", "refund", "adjustment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },
    referenceId: {
      type: String,
      unique: false,
      sparse: true,
      trim: true,
    },
    balanceAfter: {
      type: Number, // Snapshot of the wallet balance after this transaction
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
export const WalletTransaction = mongoose.model(
  "WalletTransaction",
  walletTransactionSchema
);
