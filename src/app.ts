import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

import { mongoDBConnection } from './configs/mongoDB';
// import { router } from './routes';

config();
const app: Application = express();
const PORT = process.env.PORT || 3232;
mongoDBConnection();

/*----------------------------app level middlewares-----------------------------------------------------*/
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials to be sent with the request.
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet middleware for setting security headers
app.use(helmet());

/*----------------------------app routes-----------------------------------------------------------------*/
// app.use('/v1', router);
/*----------------------------app server url-------------------------------------------------------------*/
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Hunter API',
  });
});
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'route not found in this domain' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
