"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
exports.auth = (0, express_1.Router)();
const userAuth_1 = require("../controllers/userAuth");
/**---------------------------------SignUp requests----------------------------------------- */
exports.auth.post('/signup', userAuth_1.signUp);
//# sourceMappingURL=userAuth.js.map