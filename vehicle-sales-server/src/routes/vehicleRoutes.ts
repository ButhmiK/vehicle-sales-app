import express from 'express';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getVehicles);
router.post('/', authMiddleware, createVehicle);
router.put('/:id', authMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, deleteVehicle);

export default router;