import { Router } from "express";
const router = Router();
import { login, register } from '../controllers/authController.js';
import { validRegisterInput } from "../middleware/validationMiddleware.js";


router.post('/register', validRegisterInput, register);
router.post('/login', login);

export default router;