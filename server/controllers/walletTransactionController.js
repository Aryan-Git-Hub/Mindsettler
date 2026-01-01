import { Transaction } from "../models/transactionModel.js"
import User from "../models/userModel.js";
import { WalletTransaction } from "../models/transactionModel.js";

export const getPendingTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ status:"pending" })
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

        await WalletTransaction.create({
            user: req.user._id,
            amount: amount,
            type: 'credit',
            purpose: 'topup',
            status: 'pending',
            referenceId: newTransaction._id, // Store the UPI Ref ID
            balanceAfter: req.user.walletBalance
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
/**
 * @desc    Approve a pending UPI Top-up request
 * @route   PATCH /api/admin/approve-topup/:id
 * @access  Private/Admin
 */
export const approveTopup = async (req, res) => {
    // Start a session for atomicity (Atomic Transactions)
    const session = await User.startSession();
    session.startTransaction();

    try {
        const transaction = await Transaction.findById(req.params.id).session(session);
        
        if (!transaction || transaction.status !== 'pending') {
            return res.status(400).json({ message: "Invalid transaction or already processed" });
        }

        const user = await User.findById(transaction.user).session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ message: "User not found" });
        }

        // 1. Update User Balance
        user.walletBalance += transaction.amount;
        await user.save({ session });

        // 2. Update Transaction Status
        transaction.status = 'completed';
        await transaction.save({ session });

        // 3. Update Wallet History (Ledger)
        // Note: Added 'await' and fixed the findOne logic
        const wallet_transaction = await WalletTransaction.findOne({ referenceId: transaction._id }).session(session);
        
        if (wallet_transaction) {
            wallet_transaction.status = "completed";
            await wallet_transaction.save({ session });
        }

        // Commit all changes
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Wallet topped up successfully" });
    } catch (error) {
        // Rollback on error
        await session.abortTransaction();
        session.endSession();
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
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction request not found." });
        }

        if (transaction.status !== 'pending') {
            return res.status(400).json({ 
                message: `Cannot reject. Transaction is already ${transaction.status}.` 
            });
        }

        // 1. Update Transaction status
        transaction.status = 'rejected';
        await transaction.save();

        // 2. Find and update the corresponding WalletTransaction ledger
        const wallet_transaction = await WalletTransaction.findOne({ referenceId: transaction._id });
        
        if (wallet_transaction) {
            wallet_transaction.status = "rejected";
            await wallet_transaction.save();
        }

        res.status(200).json({ 
            success: true, 
            message: "Top-up request rejected.", 
            data: transaction 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};