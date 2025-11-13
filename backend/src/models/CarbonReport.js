import mongoose from 'mongoose';

const carbonSchema = new mongoose.Schema({
  entityId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  periodStart: Date,
  periodEnd: Date,
  emissionsCO2eKg: Number,
  breakdown: mongoose.Schema.Types.Mixed,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CarbonReport', carbonSchema);
