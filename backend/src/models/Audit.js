import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  level: { type: String, enum: ['info','warn','error'], default: 'info' },
  message: String,
  meta: mongoose.Schema.Types.Mixed,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Audit', auditSchema);
