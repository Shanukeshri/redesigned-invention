import Audit from '../models/Audit.js';
import IoTDevice from '../models/IoTDevice.js';
import PolicyTarget from '../models/PolicyTarget.js';

export const getDiscomData = async (req, res, next) => {
  try {
    // demo discom data
    const demo = [{ name: 'DISCOM-A', state: 'Gujarat', lossesPercent: 12.3 }];
    res.json({ success:true, data: demo });
  } catch (err) { next(err); }
};

export const getIoTData = async (req, res, next) => {
  try {
    const deviceId = req.params.deviceId;
    const device = await IoTDevice.findOne({ deviceId });
    if (!device) return res.status(404).json({ success:false, message:'Device not found' });
    // pagination
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '50');
    const start = (page-1)*limit;
    const items = device.timeSeries.slice().reverse().slice(start, start+limit);
    res.json({ success:true, deviceId, data: items });
  } catch (err) { next(err); }
};

export const getPolicyTargets = async (req, res, next) => {
  try {
    const data = await PolicyTarget.find().limit(200);
    res.json({ success:true, data });
  } catch (err) { next(err); }
};

export const getSubsidies = async (req, res, next) => {
  try {
    // demo
    const demo = [{ scheme: 'Solar Rooftop Subsidy', state: 'All', percent: 30 }];
    res.json({ success:true, data: demo });
  } catch (err) { next(err); }
};
