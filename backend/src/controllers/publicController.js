import RenewablePotential from '../models/RenewablePotential.js';
import TrainingModule from '../models/TrainingModule.js';

export const getRenewablePotential = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.state) filter.state = req.query.state;
    const data = await RenewablePotential.find(filter).limit(500);
    res.json({ success:true, data });
  } catch (err) { next(err); }
};

export const getWeatherSample = async (req, res, next) => {
  try {
    // Demo sample - in production this would proxy to weather API when configured
    const { state, district, date } = req.query;
    const sample = {
      state,
      district,
      date: date || new Date().toISOString().split('T')[0],
      maxTempC: 36,
      minTempC: 24,
      precipitationMm: 2
    };
    res.json({ success:true, data: sample });
  } catch (err) { next(err); }
};

export const getTraining = async (req, res, next) => {
  try {
    const modules = await TrainingModule.find().limit(200);
    res.json({ success:true, data: modules });
  } catch (err) { next(err); }
};
