import mongoose from 'mongoose';

const timeSeriesSchema = new mongoose.Schema({
  ts: Date,
  metrics: mongoose.Schema.Types.Mixed
}, { _id: false });

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  type: String,
  location: { lat: Number, lng: Number, state: String, district: String },
  timeSeries: [timeSeriesSchema],
  createdAt: { type: Date, default: Date.now }
});

deviceSchema.index({ deviceId: 1 });

export default mongoose.model('IoTDevice', deviceSchema);
