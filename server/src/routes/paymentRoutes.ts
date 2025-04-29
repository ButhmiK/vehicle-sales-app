import express from 'express';
import { getPayments, createPayment, updatePayment, deletePayment } from '../controllers/paymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getPayments);
router.post('/', authMiddleware, createPayment);
router.put('/:id', authMiddleware, updatePayment);
router.delete('/:id', authMiddleware, deletePayment);

export default router;