import { Request, Response } from 'express';
import base64url from 'base64url';
import { config } from 'dotenv';
config();

import { isValidEmail } from '../../utils/emailValidation';

import { hashPassword } from '../../utils/encryptPassword';
import { User } from '../../models/user';
import { emailVerification } from '../../utils/emails/emailVerification';
import { emailVerifyCreateJWT } from '../../configs/jwt';

export const signIn = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, accountType } = req.body;
  try {
    const talent = await User.findOne({ email });
    if (talent) {
      if (talent.metaData.isActive === false) {
        return res.status(400).json({
          message: 'Please verify your email',
        });
      }
      return res.status(400).json({
        message: 'User already exist',
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters',
      });
    } else if (!isValidEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        accountType: accountType,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const rawToken = emailVerifyCreateJWT({
        userId: newUser._id,
        accountType: newUser.accountType,
        email: newUser.email,
      });
      const token = base64url(rawToken);
      const frontendUrl = process.env.FRONTEND_BASE_URL;
      const link: string = `${frontendUrl}/auth/signup/verify-email?token=${token}`;

      await emailVerification(email, link);

      await newUser.save();
      return res.status(201).json({
        message: `Verification link sent to ${email}, please check your email.`,
        link,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
