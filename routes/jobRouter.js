import { Router } from 'express';
const router = Router();
import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';

import { getAllJob, createJob, getJob, updateJob, deleteJob } from '../controllers/jobController.js';

router.route('/').get(getAllJob).post(validateJobInput, createJob);
router.route('/:id').get(validateIdParam, getJob).patch(validateJobInput, validateIdParam, updateJob).delete(validateIdParam, deleteJob);

export default router;