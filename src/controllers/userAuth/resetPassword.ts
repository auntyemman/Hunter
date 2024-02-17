import { Request, Response } from 'express';

import { User } from '../../models/user';
import { hashPassword } from '../../utils/encryptPassword';

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long',
      });
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
