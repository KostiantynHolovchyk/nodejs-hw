import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';
import { loginUser } from '../controllers/authController.js';
import { loginUserSchema } from '../validations/authValidation.js';
import { refreshUserSession } from '../controllers/authController.js';
import { logoutUser } from '../controllers/authController.js';
import { requestResetEmailSchema } from '../validations/authValidation.js';
import { requestResetEmail } from '../controllers/authController.js';
import { resetPassword } from '../controllers/authController.js';
import { resetPasswordSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);
router.post(
  '/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post('/reset-password', celebrate(resetPasswordSchema), resetPassword);
export default router;
