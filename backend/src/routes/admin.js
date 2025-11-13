import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { getAuditLogs, getStats } from '../controllers/adminController.js';

const router = express.Router();

router.get('/audit-logs', auth, authorize('admin'), getAuditLogs);
router.get('/stats', auth, authorize('admin'), getStats);

export default router;

