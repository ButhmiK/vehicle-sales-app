import express from 'express';
import { getSales, createSale, updateSale, deleteSale } from '../controllers/saleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getSales);
router.post('/', authMiddleware, createSale);
router.put('/:id', authMiddleware, updateSale);
router.delete('/:id', authMiddleware, deleteSale);

export default router;