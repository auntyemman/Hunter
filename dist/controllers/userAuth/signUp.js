"use strict";
// import { Request, Response } from 'express';
// import base64url from 'base64url';
// import { config } from 'dotenv';
// config();
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
const user_dto_1 = require("../../DTOs/user.dto");
const user_1 = require("../../models/user");
const encryptPassword_1 = require("../../utils/encryptPassword");
const emailVerification_1 = require("../../utils/emails/emailVerification");
const jwt_1 = require("../../configs/jwt");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, accountType } = req.body;
    // Create DTO instance
    const createUserDto = new user_dto_1.CreateUserDto({ firstName, lastName, email, password, accountType });
    // Validate DTO
    if (!createUserDto.isValid()) {
        return res.status(400).json({ message: 'Invalid request data' });
    }
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
        else {
            const hashedPassword = yield (0, encryptPassword_1.hashPassword)(password);
            const newUser = new user_1.User(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
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
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});
exports.signUp = signUp;
//# sourceMappingURL=signUp.js.map