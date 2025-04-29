import mongoose, { Schema } from 'mongoose';
import { Sale } from '../types/sale';

const SaleSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  saleDate: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.model<Sale>('Sale', SaleSchema);