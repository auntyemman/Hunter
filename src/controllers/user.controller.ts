import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { validateRequest } from '../utils/requestValidator';
import { SignUpDTO } from '../DTOs/users/signUp.dto';
import { ProfileDTO } from '../DTOs/users/profileUpdate.dto';
import { UserRepository } from '../repositories/user.repository';
import { errorHandler } from '../errors/errorHandler';

export class UserController {
  private readonly userRepository = new UserRepository();
  private readonly userService = new UserService(this.userRepository);

  async signUp(req: Request, res: Response): Promise<object | void> {
    try {
      const validated = await validateRequest(SignUpDTO, req.body);
      const newUser = await this.userService.createUser(validated);
      if (!newUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists',
        });
      }
      return res.status(201).json({
        status: 'success',
        message: `Verification link sent to your email, please check your email`,
        data: newUser,
      });
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }
  async updateProfile(req: Request, res: Response): Promise<object | void> {
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
      errorHandler(error, req, res);
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<object | void> {
    const { token } = req.query as { token: string };
    try {
      if (!token) {
        return res.status(400).json({ message: 'No token found' });
      }
      const user = await this.userService.verifyUserEmail(token);
      return res.status(200).json({
        status: 'success',
        message: 'Email verified successfully.',
        data: user,
      });
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<object | void> {
    const { email } = req.body;
    try {
      const user = await this.userService.forgotUSerPassword(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found with the given email' });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Password reset link sent to your email',
        data: user,
      });
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  }
}
