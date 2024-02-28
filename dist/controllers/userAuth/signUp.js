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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
// import { User } from '../../models/user';
const userService_1 = require("../../services/userService");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signUpData = req.body;
        // If data is valid, pass it to the service for further processing
        const userService = new userService_1.UserService();
        const newUser = yield userService.createUser(signUpData);
        // Send response
        return res.status(201).json({
            status: 'success',
            message: `Verification link sent to your email, please check your email.`,
            data: newUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .json({ status: 'error', message: 'Bad request', error: error.message });
        }
        return res
            .status(500)
            .json({ status: 'error', message: 'Internal server error', error: error.message });
    }
});
exports.signUp = signUp;
//# sourceMappingURL=signUp.js.map