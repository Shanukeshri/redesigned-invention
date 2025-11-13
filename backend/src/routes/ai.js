import express from 'express';
import auth from '../middleware/auth.js';
import { renewableForecast, carbonProjection, policyImpact } from '../controllers/aiController.js';

const router = express.Router();

router.post('/renewable-forecast', auth, renewableForecast);
router.post('/carbon-projection', auth, carbonProjection);
router.post('/policy-impact', auth, policyImpact);

export default router;

