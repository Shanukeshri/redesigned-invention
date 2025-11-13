import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['solar','wind','battery','microgrid','other'], default: 'solar' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  capacityMW: { type: Number, default: 0 },
  status: { type: String, enum: ['draft','active','completed','archived'], default: 'draft' },
  location: {
    lat: Number,
    lng: Number,
    state: String,
    district: String
  },
  funding: {
    required: Number,
    raised: Number
  },
  startDate: Date,
  endDate: Date,
  documents: [String],
  iotDeviceIds: [String],
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

projectSchema.index({ 'location.state': 1 });

export default mongoose.model('Project', projectSchema);
