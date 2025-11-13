import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { listCarbon, createCarbon, updateCarbon, deleteCarbon } from '../controllers/carbonController.js';

const router = express.Router();

router.get('/', listCarbon);
router.post('/', auth, authorize('sme','govt','admin'), createCarbon);
router.put('/:id', auth, updateCarbon);
router.delete('/:id', auth, deleteCarbon);

export default router;
