import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleRoutes from './routes/vehicleRoutes';
import customerRoutes from './routes/customerRoutes';
import paymentRoutes from './routes/paymentRoutes';
import saleRoutes from './routes/saleRoutes';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;