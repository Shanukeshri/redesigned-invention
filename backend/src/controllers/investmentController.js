import Investment from '../models/Investment.js';

export const listInvestments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'investor') filter.investorId = req.user._id;
    const items = await Investment.find(filter).limit(200);
    res.json({ success:true, data: items });
  } catch (err) { next(err); }
};

export const createInvestment = async (req, res, next) => {
  try {
    const payload = { ...req.body, investorId: req.user._id };
    const inv = await Investment.create(payload);
    res.json({ success:true, data: inv });
  } catch (err) { next(err); }
};

export const deleteInvestment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const inv = await Investment.findById(id);
    if (!inv) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.user._id.equals(inv.investorId) && req.user.role !== 'admin') {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }
    await inv.remove();
    res.json({ success:true, message:'Deleted' });
  } catch (err) { next(err); }
};
