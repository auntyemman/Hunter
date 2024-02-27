import { Router } from 'express';
export const hunter: Router = Router();

import { updateProfile } from '../controllers/dashboards/hunter';
import { authUser } from '../middlewares/userAuth';

/**---------------------------------SignUp request----------------------------------------- */
hunter.post('/profile', authUser, updateProfile);
