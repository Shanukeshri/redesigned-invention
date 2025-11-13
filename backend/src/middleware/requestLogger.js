import Audit from '../models/Audit.js';

export default async function requestLogger(req, res, next) {
  try {
    await Audit.create({
      level: 'info',
      message: `${req.method} ${req.originalUrl}`,
      meta: { ip: req.ip, body: req.body ? { ...req.body, password: undefined } : undefined },
      user: req.user ? req.user._id : null
    });
  } catch (err) {
    console.warn('Failed to log request', err.message);
  }
  next();
}
