import { Router } from 'express';

const auth: Router = Router();

/**---------------------------------POST requests----------------------------------------- */
auth.post('/signin', signIn);
