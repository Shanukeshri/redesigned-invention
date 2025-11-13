import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import generateRequestId from '../utils/generateRequestId.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, location, aadhaarId } = req.body;
    if (!['admin','govt','sme','investor','citizen','ngo'].includes(role)) {
      return res.status(400).json({ success:false, message:'Invalid role' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success:false, message:'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashed, role, location, aadhaarId });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ success:true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message:'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success:false, message:'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ success:true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};

export const me = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({ success:true, user });
  } catch (err) { next(err); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ success:true, user });
  } catch (err) { next(err); }
};

