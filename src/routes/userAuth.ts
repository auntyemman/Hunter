import { Router } from 'express';
export const auth: Router = Router();

import {
    signUp,
    signIn,
} from '../controllers/userAuth';

/**---------------------------------SignUp request----------------------------------------- */
auth.post('/signup', signUp);

/**---------------------------------SignIn request----------------------------------------- */
auth.post('/signin', signIn);
