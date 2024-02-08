import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { JWTPayload } from './customTypes';

config();
const secret = process.env.JWT_SECRET as string;

export const createJWT = (payload: object) => {
  const token = jwt.sign(payload, secret, { expiresIn: '12h' });
  return token;
};

export const forgotPasswordCreateJWT = (payload: object) => {
  // consider using this custom type payload if this does not work
  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  return token;
};

export const emailVerifyCreateJWT = (payload: object) => {
  // consider using this custom type payload if this does not work
  const token = jwt.sign(payload, secret, { expiresIn: '48h' });
  return token;
};

export const verifyJWT = (token: string) => {
  try {
    // Verify the JWT token using your secret key
    const decoded = jwt.verify(token, secret) as JWTPayload;

    // If verification is successful, return the decoded payload
    return decoded;
  } catch (error) {
    // Handle token verification errors
    if (error instanceof jwt.TokenExpiredError) {
      // Token has expired
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Token is invalid or malformed
      throw new Error('Invalid token');
    } else {
      // Handle other errors
      throw error;
    }
  }
};

export const generateRefreshToken = async (user: object) => {
  return createJWT(user);
};
