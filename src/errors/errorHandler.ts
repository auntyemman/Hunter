import { Request, Response } from 'express';

export function errorHandler(error: any, req: Request, res: Response) {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof TypeError) {
    statusCode = 500;
    message = 'Internal server error';
  }
  if (error instanceof Error) {
    statusCode = 400;
    message = 'Bad request';
  }
  res.status(statusCode).json({ status: 'error', message, error: error.message });
}
