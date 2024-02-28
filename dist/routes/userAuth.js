"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
exports.auth = (0, express_1.Router)();
const userAuth_1 = require("../controllers/userAuth");
/**---------------------------------SignUp request----------------------------------------- */
exports.auth.post('/signup', userAuth_1.signUp);
/**---------------------------------SignIn request----------------------------------------- */
exports.auth.post('/signin', userAuth_1.signIn);
/**---------------------------------Verify email request----------------------------------------- */
exports.auth.get('/verify-email', userAuth_1.verifyEmail);
/**---------------------------------Forgot password request----------------------------------------- */
exports.auth.post('/forgot-password', userAuth_1.forgotPassword);
/**---------------------------------Confirm code request----------------------------------------- */
exports.auth.post('/confirm-code', userAuth_1.confirmCode);
/**---------------------------------Reset password request----------------------------------------- */
exports.auth.post('/reset-password', userAuth_1.resetPassword);
//# sourceMappingURL=userAuth.js.map