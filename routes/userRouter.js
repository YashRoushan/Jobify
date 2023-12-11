import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { updateJob } from "../controllers/jobController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
const router = Router();


router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
// check
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;