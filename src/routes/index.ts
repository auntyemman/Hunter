/*---------------this maps all the routes together before relaying them to the app.ts file for app level routing-----------*/
import { Router } from 'express';

import { auth } from './userAuth';
// import { hunter } from './hunterDashboard';

export const router: Router = Router();

// each route
router.use('/auth', auth);
// router.use('/', hunter);
