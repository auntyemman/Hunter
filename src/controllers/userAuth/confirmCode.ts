import { Request, Response } from 'express';

import { User } from '../../models/user';

export const confirmCode = async (req: Request, res: Response) => {
  const { code } = req.body;
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: `User with ${email} does not exist` });
    }
    if (user.metaData.verificationCode !== code) {
      return res.status(400).json({ message: 'Code does not match or invalid code' });
    }
    user.metaData.verificationCode = '';
    await user.save();
    return res.status(200).json({ message: 'Code verified successfully.' });
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal server error' });
  }
};
