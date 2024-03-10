import { Request, Response } from 'express';

import { UserService } from '../../services/user.service';
import { validateRequest } from '../../utils/requestValidator';
import { ProfileDTO } from '../../DTOs/users/profileUpdate.dto';
import { UserRepository } from '../../repossitory/user.repository';

export const updateProfile = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  try {
    const validated = await validateRequest(ProfileDTO, req.body);
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const newUser = await userService.updateUser(userId, validated);
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
