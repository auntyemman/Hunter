"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const base64url_1 = __importDefault(require("base64url"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const emailValidation_1 = require("../../utils/emailValidation");
const encryptPassword_1 = require("../../utils/encryptPassword");
const user_1 = require("../../models/user");
const emailVerification_1 = require("../../utils/emails/emailVerification");
const jwt_1 = require("../../configs/jwt");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { firstName, lastName, email, password, accountType } = req.body;
    try {
        const talent = yield user_1.User.findOne({ email });
        if (talent) {
            if (talent.metaData.isActive === false) {
                return res.status(400).json({
                    message: 'Please verify your email',
                });
            }
            return res.status(400).json({
                message: 'User already exist',
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters',
            });
        }
        else if (!(0, emailValidation_1.isValidEmail)(email)) {
            res.status(400).json({ message: 'Invalid email format' });
        }
        else {
            const hashedPassword = yield (0, encryptPassword_1.hashPassword)(password);
            const newUser = new user_1.User({
                accountType: accountType,
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            const rawToken = (0, jwt_1.emailVerifyCreateJWT)({
                userId: newUser._id,
                accountType: newUser.accountType,
                email: newUser.email,
            });
            const token = (0, base64url_1.default)(rawToken);
            const frontendUrl = process.env.FRONTEND_BASE_URL;
            const link = `${frontendUrl}/auth/signup/verify-email?token=${token}`;
            yield (0, emailVerification_1.emailVerification)(email, link);
            yield newUser.save();
            return res.status(201).json({
                message: `Verification link sent to ${email}, please check your email.`,
                link,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});
exports.signUp = signUp;
// import { Request, Response } from 'express';
// import { CreateUserDto } from '../../DTOs/user.dto';
// import { User } from '../../models/user';
// import { hashPassword } from '../../utils/encryptPassword';
// import { emailVerification } from '../../utils/emails/emailVerification';
// import { emailVerifyCreateJWT } from '../../configs/jwt';
// export const signIn = async (req: Request, res: Response) => {
//   const { firstName, lastName, email, password, accountType } = req.body;
//   // Create DTO instance
//   const createUserDto = new CreateUserDto({ firstName, lastName, email, password, accountType });
//   // Validate DTO
//   if (!createUserDto.isValid()) {
//     return res.status(400).json({ message: 'Invalid request data' });
//   }
//   try {
//     const talent = await User.findOne({ email });
//     if (talent) {
//       if (talent.metaData.isActive === false) {
//         return res.status(400).json({
//           message: 'Please verify your email',
//         });
//       }
//       return res.status(400).json({
//         message: 'User already exist',
//       });
//     } else {
//       const hashedPassword = await hashPassword(password);
//       const newUser = new User({
//         ...CreateUserDto,
//         // accountType: accountType,
//         // firstName,
//         // lastName,
//         // email,
//         // password: hashedPassword,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', message: 'Internal server error' });
//   }
// };
//# sourceMappingURL=signUp.js.map