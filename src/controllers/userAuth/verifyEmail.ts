import { Request, Response } from 'express';
import base64url from 'base64url';

import { User } from '../../models/user';
import { verifyJWT } from '../../configs/jwt';

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query as { token: string };

  try {
    const decodedToken = base64url.decode(token);
    const decoded = verifyJWT(decodedToken);
    const { email } = decoded;

    const user = await User.findOne({ email });

    if (!token) {
      return res.status(400).json({ message: 'No token found' });
    } else if (!decoded || !decoded.email) {
      return res.status(400).json({ message: 'Invalid token' });
    } else if (user && !user.metaData.isActive) {
      user.metaData.isActive = true;
      await user.save();
      return res.status(200).json({
        message: 'Email verified successfully.',
      });
    } else {
      // Email is already verified
      return res.status(200).json({ message: 'Email already verified' });
    }
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token expired' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
