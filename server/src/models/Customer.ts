import mongoose, { Schema } from 'mongoose';
import { Customer } from '../types/customer';

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },
});

export default mongoose.model<Customer>('Customer', CustomerSchema);