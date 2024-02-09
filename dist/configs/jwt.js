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
exports.generateRefreshToken = exports.verifyJWT = exports.emailVerifyCreateJWT = exports.forgotPasswordCreateJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const secret = process.env.JWT_SECRET;
const createJWT = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '12h' });
    return token;
};
exports.createJWT = createJWT;
const forgotPasswordCreateJWT = (payload) => {
    // consider using this custom type payload if this does not work
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '24h' });
    return token;
};
exports.forgotPasswordCreateJWT = forgotPasswordCreateJWT;
const emailVerifyCreateJWT = (payload) => {
    // consider using this custom type payload if this does not work
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '48h' });
    return token;
};
exports.emailVerifyCreateJWT = emailVerifyCreateJWT;
const verifyJWT = (token) => {
    try {
        // Verify the JWT token using your secret key
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // If verification is successful, return the decoded payload
        return decoded;
    }
    catch (error) {
        // Handle token verification errors
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            // Token has expired
            throw new Error('Token has expired');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            // Token is invalid or malformed
            throw new Error('Invalid token');
        }
        else {
            // Handle other errors
            throw error;
        }
    }
};
exports.verifyJWT = verifyJWT;
const generateRefreshToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports.createJWT)(user);
});
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwt.js.map