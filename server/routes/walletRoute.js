import express from "express";
import { getAllTransactions, getUserTransactions, approveTopup, createTransaction, rejectTopup } from '../controllers/walletTransactionController.js'
import { admin } from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/', admin, getAllTransactions);
router.get('/user-wallet-transactions', getUserTransactions);
router.post('/create-transaction', createTransaction);
router.patch('/aproove-topup/:id', admin, approveTopup);
router.patch('/reject-topup/:id', admin, rejectTopup);

export default router