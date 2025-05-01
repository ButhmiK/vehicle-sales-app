import mongoose, { Schema } from 'mongoose';
import { Payment } from '../types/payment';

const PaymentSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  method: { type: String, required: true },
});

export default mongoose.model<Payment>('Payment', PaymentSchema);