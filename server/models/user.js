import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  address: String,
  cnic: String,
  phone: String,
  otp: String,
  status: { type: String, enum: ['Verified', 'Not Verified'], default: 'Not Verified' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
