import CarbonReport from '../models/CarbonReport.js';

export const listCarbon = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.entityId) filter.entityId = req.query.entityId;
    const items = await CarbonReport.find(filter).limit(200);
    res.json({ success:true, data: items });
  } catch (err) { next(err); }
};

export const createCarbon = async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const doc = await CarbonReport.create(payload);
    res.json({ success:true, data: doc });
  } catch (err) { next(err); }
};

export const updateCarbon = async (req, res, next) => {
  try {
    const doc = await CarbonReport.findById(req.params.id);
    if (!doc) return res.status(404).json({ success:false, message:'Not found' });
    if (!req.user._id.equals(doc.createdBy) && req.user.role !== 'govt' && req.user.role !== 'admin') {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }
    Object.assign(doc, req.body);
    await doc.save();
    res.json({ success:true, data: doc });
  } catch (err) { next(err); }
};

export const deleteCarbon = async (req, res, next) => {
  try {
    await CarbonReport.findByIdAndDelete(req.params.id);
    res.json({ success:true, message:'Deleted' });
  } catch (err) { next(err); }
};
