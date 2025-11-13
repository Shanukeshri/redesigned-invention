import mongoose from 'mongoose';

const potentialSchema = new mongoose.Schema({
  state: String,
  district: String,
  estimatedMW: Number,
  source: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.RenewablePotential ||
  mongoose.model('RenewablePotential', potentialSchema);

