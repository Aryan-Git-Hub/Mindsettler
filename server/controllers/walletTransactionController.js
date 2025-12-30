import { Transaction } from "../models/transactionModel.js"
import User from "../models/userModel.js";
import { WalletTransaction } from "../models/transactionModel.js";

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('user', 'name email')

        res.status(200).json({ success: true, count:transactions.length, data: transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getUserTransactions = async (req, res) => {
    try {
        const transactions = await WalletTransaction.find({user:req.user._id})
            .populate('user', 'name email')

        res.status(200).json({ success: true, count:transactions.length, data: transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @desc    Submit a wallet top-up request (UPI)
 * @route   POST /api/transactions/topup
 * @access  Private
 */
export const createTransaction = async (req, res) => {
    try {
        const { amount, transactionId } = req.body;

        // 1. Validation
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Please enter a valid amount." });
        }
        if (!transactionId) {
            return res.status(400).json({ message: "Transaction Reference ID is required." });
        }

        // 2. Check if this Transaction ID was already submitted (Prevention of fraud)
        const existingTx = await Transaction.findOne({ transactionId });
        if (existingTx) {
            return res.status(400).json({ 
                message: "This Transaction ID has already been submitted for verification." 
            });
        }

        // 3. Create the Transaction request
        const newTransaction = await Transaction.create({
            user: req.user._id, // From your protect middleware
            amount,
            transactionId,
            status: 'pending' // Admin will change this to 'completed' later
        });

        res.status(201).json({
            success: true,
            message: "Top-up request submitted. Please wait for admin approval.",
            data: newTransaction
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @desc    Approve a pending UPI Top-up and credit wallet
 * @route   PATCH /api/admin/approve-topup/:id
 * @access  Private/Admin
 */
export const approveTopup = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction || transaction.status !== 'pending') {
            return res.status(400).json({ message: "Invalid transaction or already processed" });
        }
        const user = await User.findById(transaction.user);
        if (!user) return res.status(404).json({ message: "User not found" });
        // 1. Update User Balance
        user.walletBalance += transaction.amount;
        await user.save();

        // 2. Update Transaction Status
        transaction.status = 'completed';
        await transaction.save();

        // 3. Create a record in Wallet History (Ledger)
        await WalletTransaction.create({
            user: user._id,
            amount: transaction.amount,
            type: 'credit',
            purpose: 'topup',
            status: 'completed',
            referenceId: transaction.transactionId, // Store the UPI Ref ID
            balanceAfter: user.walletBalance
        });

        res.status(200).json({ success: true, message: "Wallet topped up successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @desc    Reject a pending UPI Top-up request
 * @route   PATCH /api/admin/reject-topup/:id
 * @access  Private/Admin
 */
export const rejectTopup = async (req, res) => {
    try {
        // 1. Find the transaction
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction request not found." });
        }

        // 2. Ensure it hasn't been processed already
        if (transaction.status !== 'pending') {
            return res.status(400).json({ 
                message: `Cannot reject. Transaction is already ${transaction.status}.` 
            });
        }

        // 3. Update status to rejected
        transaction.status = 'rejected';
        
        await transaction.save();

        res.status(200).json({ 
            success: true, 
            message: "Top-up request rejected.", 
            data: transaction 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};