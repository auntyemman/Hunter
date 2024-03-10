import { Request, Response } from 'express';

import { UserService } from '../../services/user.service';
import { validateRequest } from '../../utils/requestValidator';
import { SignUpDTO } from '../../DTOs/users/signUp.dto';
import { UserRepository } from '../../repossitory/user.repository';

export const signUp = async (req: Request, res: Response) => {
  try {
    const validated = await validateRequest(SignUpDTO, req.body);
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const newUser = await userService.createUser(validated);
    return res.status(201).json({
      status: 'success',
      message: `Verification link sent to your email, please check your email.`,
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
