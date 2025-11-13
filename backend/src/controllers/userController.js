import User from '../models/User.js';

export const listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '20');
    const users = await User.find().select('-password').skip((page-1)*limit).limit(limit);
    const total = await User.countDocuments();
    res.json({ success:true, data: users, meta: { page, limit, total } });
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({ success:true, message:'User deleted' });
  } catch (err) { next(err); }
};
