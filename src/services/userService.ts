import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import base64url from 'base64url';

import { User, IUser } from '../models/user';
import { emailVerification } from '../utils/emails/emailVerification';
import { emailVerifyCreateJWT } from '../configs/jwt';
import { hashPassword } from '../utils/encryptPassword';
import { SignUpDTO, ProfileDTO } from '../DTOs/users/users.dto';
import { calculateAge } from '../utils/calculateAge';
import { validatePhoneNumber } from '../utils/verifyPhoneNumber';

export class UserService {
  constructor(private readonly UserModel = User) {}

  /*-------------------------------------------Repository-------------------------------------------*/
  async getUserById(userId: string): Promise<IUser | null> {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  }
  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  /*-------------------------------------------Service-------------------------------------------*/
  async createUser(signUpData: SignUpDTO): Promise<IUser> {
    // Transform DTO to Mongoose model
    const newUser = plainToClass(SignUpDTO, signUpData);

    // Generate verification token
    const rawToken = emailVerifyCreateJWT({
      userId: newUser._id,
      accountType: newUser.accountType,
      email: newUser.email,
    });
    const token = base64url(rawToken);
    const frontendUrl = process.env.FRONTEND_BASE_URL;
    const link: string = `${frontendUrl}/auth/signup/verify-email?token=${token}`;

    // Validate the incoming data using the SignUpDTO
    const errors = await validate(newUser, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      const constraintErrors = errors.map((error) => {
        const { constraints } = error;
        return constraints;
      });
      throw new Error(JSON.stringify(constraintErrors));
    }
    if (!newUser) {
      throw new Error('Invalid user data');
    }
    const existingUser = await this.getUserByEmail(newUser.email);
    if (existingUser) {
      if (!existingUser.metaData.isActive) {
        // Send email verification
        await emailVerification(newUser.email, newUser.firstName, link);
        throw new Error('Please verify your email, check your email');
      }
      throw new Error('User already exists');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;

    // Create a new user document
    const newUserDoc = new this.UserModel(newUser);
    await newUserDoc.save();

    // Send email verification
    await emailVerification(newUser.email, newUser.firstName, link);

    return newUserDoc.toObject(); // Return the created user
  }

  async updateUser(userId: string, profileData: ProfileDTO): Promise<IUser | null> {
    const updatedUser = plainToClass(ProfileDTO, profileData); // Transform DTO to Mongoose model
    const errors = await validate(updatedUser, { whitelist: true, forbidNonWhitelisted: true }); // Validate DTO
    if (errors.length > 0) {
      const constraintErrors = errors.map((error) => {
        const { constraints } = error;
        return constraints;
      });
      throw new Error(JSON.stringify(constraintErrors));
    }
    const existingUser = await this.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }
    // const stringDOB = updatedUser.DOB.toDateString();
    updatedUser.age = calculateAge(updatedUser.DOB);
    updatedUser.phone = validatePhoneNumber(updatedUser.phone);
    updatedUser.alternatePhone = validatePhoneNumber(updatedUser.alternatePhone);
    const updatedUserData = JSON.parse(JSON.stringify(updatedUser));

    await this.UserModel.findByIdAndUpdate(userId, updatedUserData);
    return this.getUserById(userId); // Fetch updated user
  }
}
