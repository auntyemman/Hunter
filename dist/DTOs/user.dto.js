"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
// import { IUser } from '../models/user';
const emailValidation_1 = require("../utils/emailValidation");
class CreateUserDto {
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.accountType = data.accountType; // Add accountType assignment if needed
    }
    isValid() {
        // Implement your validation logic here
        if (!this.password || this.password.length < 8) {
            return false;
        }
        if (!(0, emailValidation_1.isValidEmail)(this.email)) {
            return false;
        }
        // Add more validation rules as needed
        return true;
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=user.dto.js.map