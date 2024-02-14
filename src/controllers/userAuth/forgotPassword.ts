import { Request, Response } from 'express';

import { User } from '../../models/user';

import { forgotPasswordMail } from '../../utils/emails/forgotPassword';
import { verificationCode } from '../../utils/verificationCode';
import { isValidEmail } from '../../utils/emailValidation';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.metaData.isActive === false) {
        return res.status(400).json({ message: 'User is not verified' });
      } else if (!isValidEmail(email)) {
        res.status(400).json({ message: 'Invalid email format' });
      } else {
        const code = verificationCode();
        user.metaData.verificationCode = code;
        await user.save();
        await forgotPasswordMail(email, code);
        res.status(200).json({
          message: `Verification code has been sent to ${email}`,
          code,
        });
      }
    } else {
      res.status(400).json({ message: `User with ${email} does not exist` });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
