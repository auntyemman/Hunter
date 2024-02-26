import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';

interface ErrorResponse {
  status: number;
  message: string;
  errors?: any[];
}

const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const errorResponse: ErrorResponse = {
    status: 500,
    message: 'Internal Server Error',
  };

  if (err instanceof ValidationError) {
    errorResponse.status = 400;
    errorResponse.message = 'Validation failed';
    errorResponse.errors = err.errors.map((error: ValidationError) => ({
      field: error.property,
      message: error.constraints ? Object.values(error.constraints)[0] : 'Invalid value',
    }));
  } else if (err.name === 'CastError') {
    errorResponse.status = 400;
    errorResponse.message = 'Invalid request data';
  } else if (err.name === 'MongoServerError') {
    if (err.code === 11000) {
      errorResponse.status = 409;
      errorResponse.message = 'Duplicate key violation';
    } else {
      errorResponse.status = 500;
      errorResponse.message = 'Database error';
    }
  } else if (err.name === 'JsonWebTokenError') {
    errorResponse.status = 401;
    errorResponse.message = 'Invalid authorization token';
  } else if (err.status && err.message) {
    errorResponse.status = err.status;
    errorResponse.message = err.message;
  } else {
    errorResponse.status = 500;
    errorResponse.message = 'Internal Server Error';
  }

  if (process.env.NODE_ENV === 'development') {
    errorResponse.errors = err;
  } else {
    delete errorResponse.errors;
  }

  res.status(errorResponse.status).json(errorResponse);
};

export default handleError;
