import fetch from 'node-fetch';
import generateRequestId from '../utils/generateRequestId.js';
import dotenv from 'dotenv';
dotenv.config();

const pickAIUrl = (key) => {
  // prefer direct specific vars, fallback to map
  const map = (() => {
    try { return JSON.parse(process.env.AI_BASE_URL_MAP || '{}'); } catch { return {}; }
  })();
  if (map && map[key]) return map[key];
  if (key === 'renewable' && process.env.AI_BASE_URL_RENEWABLE) return process.env.AI_BASE_URL_RENEWABLE;
  if (key === 'carbon' && process.env.AI_BASE_URL_CARBON) return process.env.AI_BASE_URL_CARBON;
  // fallback to first AI_BASE_URLS item
  if (process.env.AI_BASE_URLS) return process.env.AI_BASE_URLS.split(',')[0].trim();
  return null;
};

const forwardToAI = async (url, payload) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  return json;
};

export const renewableForecast = async (req, res, next) => {
  try {
    const { state, projectIds, dateRange } = req.body;
    if (!state) return res.status(400).json({ success:false, message:'state required' });
    const aiUrl = pickAIUrl('renewable');
    if (!aiUrl) return res.status(500).json({ success:false, message:'AI backend not configured' });

    const requestId = generateRequestId();
    const forwarded = await forwardToAI(`${aiUrl}/forecast/renewable`, { state, projectIds, dateRange, requestedBy: req.user ? req.user._id : null });
    const resp = { requestId, cached:false, ...forwarded };
    res.json(resp);
  } catch (err) { next(err); }
};

export const carbonProjection = async (req, res, next) => {
  try {
    const { entityId, timeHorizon } = req.body;
    if (!entityId) return res.status(400).json({ success:false, message:'entityId required' });
    const aiUrl = pickAIUrl('carbon');
    if (!aiUrl) return res.status(500).json({ success:false, message:'AI backend not configured' });
    const requestId = generateRequestId();
    const forwarded = await forwardToAI(`${aiUrl}/projection/carbon`, { entityId, timeHorizon, requestedBy: req.user ? req.user._id : null });
    const resp = { requestId, cached:false, ...forwarded };
    res.json(resp);
  } catch (err) { next(err); }
};

export const policyImpact = async (req, res, next) => {
  try {
    const { scenario } = req.body;
    if (!scenario) return res.status(400).json({ success:false, message:'scenario required' });
    const aiUrl = pickAIUrl('renewable') || pickAIUrl('policy') || process.env.AI_BASE_URLS?.split(',')[0];
    if (!aiUrl) return res.status(500).json({ success:false, message:'AI backend not configured' });
    const requestId = generateRequestId();
    const forwarded = await forwardToAI(`${aiUrl}/simulate/policy-impact`, { scenario, requestedBy: req.user ? req.user._id : null });
    const resp = { requestId, cached:false, ...forwarded };
    res.json(resp);
  } catch (err) { next(err); }
};
