import express from 'express';
import { getRenewablePotential, getWeatherSample, getTraining } from '../controllers/publicController.js';

const router = express.Router();

router.get('/renewable-potential', getRenewablePotential);
router.get('/weather', getWeatherSample);
router.get('/training', getTraining);

export default router;
