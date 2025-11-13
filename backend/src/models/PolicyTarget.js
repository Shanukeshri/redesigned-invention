import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  region: String,
  targetYear: Number,
  targetMW: Number,
  details: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PolicyTarget', policySchema);
