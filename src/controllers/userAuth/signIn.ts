import { Request, Response } from 'express';

import { User } from '../../models/user';
import { comparePasswords } from '../../utils/encryptPassword';
import { createJWT } from '../../configs/jwt';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    if (user.metaData.isActive === false) {
      return res.status(400).json({ message: 'User is not verified' });
    }
    const accessToken = createJWT({
      userId: user._id,
      accountType: user.accountType,
      email: user.email,
    });
    user.metaData.verificationCode = '';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      message: 'Logged in successfully',
      data: {
        accessToken,
        accountId: user._id,
        email: user.email,
        firstName: user.firstName,
        accountType: user.accountType,
        picture: user.picture,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
