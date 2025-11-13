import express from 'express';
import auth from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', auth, authorize('govt','sme','admin'), createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

export default router;
