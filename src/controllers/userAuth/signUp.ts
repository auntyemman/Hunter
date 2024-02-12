// import { Request, Response } from 'express';
// import base64url from 'base64url';
// import { config } from 'dotenv';
// config();

// import { isValidEmail } from '../../utils/emailValidation';

// import { hashPassword } from '../../utils/encryptPassword';
// import { User } from '../../models/user';
// import { emailVerification } from '../../utils/emails/emailVerification';
// import { emailVerifyCreateJWT } from '../../configs/jwt';

// export const signUp = async (req: Request, res: Response) => {
//   const { firstName, lastName, email, password, accountType } = req.body;
//   try {
//     const talent = await User.findOne({ email });
//     if (talent) {
//       if (talent.metaData.isActive === false) {
//         return res.status(400).json({
//           message: 'Please verify your email.',
//         });
//       }
//       return res.status(400).json({
//         message: 'User already exist',
//       });
//     }
//     if (password.length < 8) {
//       return res.status(400).json({
//         message: 'Password must be at least 8 characters',
//       });
//     } else if (!isValidEmail(email)) {
//       res.status(400).json({ message: 'Invalid email format' });
//     } else {
//       const hashedPassword = await hashPassword(password);
//       const newUser = new User({
//         accountType: accountType,
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword,
//       });

//       const rawToken = emailVerifyCreateJWT({
//         userId: newUser._id,
//         accountType: newUser.accountType,
//         email: newUser.email,
//       });
//       const token = base64url(rawToken);
//       const frontendUrl = process.env.FRONTEND_BASE_URL;
//       const link: string = `${frontendUrl}/auth/signup/verify-email?token=${token}`;

//       await emailVerification(email, link);

//       await newUser.save();
//       return res.status(201).json({
//         message: `Verification link sent to ${email}, please check your email.`,
//         link,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// };

import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import base64url from 'base64url';

import { hashPassword } from '../../utils/encryptPassword';
import { User } from '../../models/user';
import { emailVerification } from '../../utils/emails/emailVerification';
import { emailVerifyCreateJWT } from '../../configs/jwt';
import { UserDTO } from '../../DTOs/signUp.dto'; // Assuming UserDTO is in the same directory as this file

export const signUp = async (req: Request, res: Response) => {
  try {
    // Transform request body into UserDTO instance
    const userDto = plainToClass(UserDTO, req.body);

    // Validate userDto
    const errors = await validate(userDto);
    if (errors.length > 0) {
      const constraintErrors = errors.map((error) => {
        const { constraints } = error;
        return constraints;
      });
      return res.status(400).json({ errors: constraintErrors });
    }

    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email: userDto.email });
    if (existingUser) {
      if (!existingUser.metaData.isActive) {
        return res.status(400).json({
          message: 'Please verify your email.',
        });
      }
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    // Hash the password
    if (!userDto.password) {
      return res.status(400).json({ message: 'no password' });
    }
    const hashedPassword = await hashPassword(userDto.password);

    // Create a new User document
    const newUser = new User({
      accountType: userDto.accountType,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      password: hashedPassword,
    });

    // Generate verification token
    const rawToken = emailVerifyCreateJWT({
      userId: newUser._id,
      accountType: newUser.accountType,
      email: newUser.email,
    });
    const token = base64url(rawToken);
    const frontendUrl = process.env.FRONTEND_BASE_URL;
    const link: string = `${frontendUrl}/auth/signup/verify-email?token=${token}`;

    // Send email verification
    await emailVerification(newUser.email, link);

    // Save the new user to the database
    await newUser.save();

    // Send response
    return res.status(201).json({
      message: `Verification link sent to ${newUser.email}, please check your email.`,
      link,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
