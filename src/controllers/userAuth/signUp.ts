import { Request, Response } from 'express';

// import { User } from '../../models/user';
import { UserService } from '../../services/userService';

export const signUp = async (req: Request, res: Response) => {
  try {
    const signUpData = req.body;
    // If data is valid, pass it to the service for further processing
    const userService = new UserService();
    const newUser = await userService.createUser(signUpData);
    // Send response
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
