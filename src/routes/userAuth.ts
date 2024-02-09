import { Router } from 'express';
export const auth: Router = Router();

import { signUp } from '../controllers/userAuth';

/**---------------------------------SignUp requests----------------------------------------- */
auth.post('/signup', signUp);
