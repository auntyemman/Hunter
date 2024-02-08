/*---------------this maps all the routes together before relaying them to the app.js file for app level routing-----------*/
import { Router } from 'express';

import { auth } from './userAuth';

export const router: Router = Router();

// each route
router.use('/', auth);
