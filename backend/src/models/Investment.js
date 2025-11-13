import mongoose from 'mongoose';

const investSchema = new mongoose.Schema({
  investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','confirmed','cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Investment', investSchema);
