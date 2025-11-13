import Audit from '../models/Audit.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await Audit.find().sort({ createdAt: -1 }).limit(500);
    res.json({ success:true, data: logs });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const users = await User.countDocuments();
    const projects = await Project.countDocuments();
    const recent = { users, projects };
    res.json({ success:true, data: recent });
  } catch (err) { next(err); }
};
