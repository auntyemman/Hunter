import { Request, Response, NextFunction } from 'express';

import { User } from '../models/user';
import { verifyJWT } from '../configs/jwt';

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = (req.headers as { authorization?: string }).authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return sendUnauthorizedResponse(res, 'Invalid or missing authorization header');
  }
  const token = authorizationHeader.split(' ')[1];
  try {
    const decoded = await verifyJWT(token);
    res.locals.user = decoded; // Attach user data to the request
    // Updating the last online status
    const user = await User.findOne({ _id: decoded.userId });
    if (user) {
      user.metaData.lastOnline = new Date();
      await user.save();
    }
    next(); // Allow the request to proceed
  } catch (err) {
    next(err);
    return sendUnauthorizedResponse(res, 'Invalid token or authorization header');
  }
};

const sendUnauthorizedResponse = (res: Response, errorMessage: string) => {
  return res.status(401).json({ message: 'Unauthorized', error: errorMessage });
};
