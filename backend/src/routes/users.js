import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { listUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', auth, authorize('admin'), listUsers);
router.delete('/:id', auth, authorize('admin'), deleteUser);

export default router;
