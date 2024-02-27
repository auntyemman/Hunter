import { Request, Response } from 'express';

import { UserService } from '../../../services/userService';

export const updateProfile = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  try {
    const profileData = req.body;
    // If data is valid, pass it to the service for further processing
    const userService = new UserService();
    const newUser = await userService.updateUser(userId, profileData);
    // Send response
    return res.status(200).json({
      status: 'success',
      message: 'profile updated',
      data: newUser,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Bad request', error: error.message });
    }
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error', error: error.message });
  }
};
