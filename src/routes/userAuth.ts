import { Router } from 'express';
export const auth: Router = Router();

import {
  signUp,
  signIn,
  verifyEmail,
  forgotPassword,
  confirmCode,
  resetPassword,
  updateProfile,
} from '../controllers/userAuth';
import { authUser } from '../middlewares/userAuth';

/**---------------------------------SignUp request----------------------------------------- */
auth.post('/signup', signUp);

/**---------------------------------SignIn request----------------------------------------- */
auth.post('/signin', signIn);

/**---------------------------------Verify email request----------------------------------------- */
auth.get('/verify-email', verifyEmail);

/**---------------------------------Forgot password request----------------------------------------- */
auth.post('/forgot-password', forgotPassword);

/**---------------------------------Confirm code request----------------------------------------- */
auth.post('/confirm-code', confirmCode);

/**---------------------------------Reset password request----------------------------------------- */
auth.post('/reset-password', resetPassword);

/**---------------------------------Update profile request----------------------------------------- */
auth.post('/profile', authUser, updateProfile);
