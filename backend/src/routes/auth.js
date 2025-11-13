import express from 'express';
import { body } from 'express-validator';
import validateRequest from '../middleware/validateRequest.js';
import { register, login, me, updateProfile } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register',
  authLimiter,
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validateRequest,
  register);

router.post('/login',
  authLimiter,
  body('email').isEmail(),
  body('password').exists(),
  validateRequest,
  login);

router.get('/me', auth, me);
router.put('/profile', auth, updateProfile);

export default router;
