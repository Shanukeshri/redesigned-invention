import express from 'express';
import auth from '../middleware/auth.js';
import { listInvestments, createInvestment, deleteInvestment } from '../controllers/investmentController.js';

const router = express.Router();

router.get('/', auth, listInvestments);
router.post('/', auth, createInvestment);
router.delete('/:id', auth, deleteInvestment);

export default router;
