import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { getDiscomData, getIoTData, getPolicyTargets, getSubsidies } from '../controllers/externalController.js';

const router = express.Router();

router.get('/discom', auth, authorize('govt','admin'), getDiscomData);
router.get('/iot/:deviceId', auth, authorize('govt','admin'), getIoTData);
router.get('/policy-targets', auth, authorize('govt','admin'), getPolicyTargets);
router.get('/subsidies', auth, authorize('govt','admin'), getSubsidies);

export default router;
