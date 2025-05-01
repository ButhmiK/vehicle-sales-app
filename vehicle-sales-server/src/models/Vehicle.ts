import mongoose, { Schema } from 'mongoose';
import { Vehicle } from '../types/vehicle';

const VehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<Vehicle>('Vehicle', VehicleSchema);