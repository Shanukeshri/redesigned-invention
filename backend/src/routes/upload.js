import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { handleUpload, uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', auth, authorize('govt','sme','admin'), handleUpload, uploadFile);

export default router;
