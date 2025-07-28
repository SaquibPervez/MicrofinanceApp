import mongoose from 'mongoose';

const LoanRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  initialDeposit: {
    type: Number,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  loanPeriod: {
    type: String, 
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LoanRequest || mongoose.model('LoanRequest', LoanRequestSchema);
