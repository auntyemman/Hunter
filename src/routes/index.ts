import { Router } from 'express';
import { auth } from './user.route';

export const router: Router = Router();

// each route
router.use('/auth', auth);
