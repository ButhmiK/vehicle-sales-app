import mongoose, { Schema } from 'mongoose';
import { User } from '../types/user';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);