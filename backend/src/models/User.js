import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','govt','sme','investor','citizen','ngo'], default: 'citizen' },
  location: { type: String },
  aadhaarId: { type: String },
  createdAt: { type: Date, default: Date.now },
  demo: { type: Boolean, default: false }
});

userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);
