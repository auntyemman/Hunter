import { Router } from 'express';
export const auth: Router = Router();

import { signUp, signIn, verifyEmail, forgotPassword } from '../controllers/userAuth';

/**---------------------------------SignUp request----------------------------------------- */
auth.post('/signup', signUp);

/**---------------------------------SignIn request----------------------------------------- */
auth.post('/signin', signIn);

/**---------------------------------Verify email request----------------------------------------- */
auth.get('/verify-email', verifyEmail);

/**---------------------------------Forgot password request----------------------------------------- */
auth.post('/forgot-password', forgotPassword);
