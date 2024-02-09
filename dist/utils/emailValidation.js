"use strict";
/**
 * Checks if the given email is valid.
 *
 * @param email - The email to be validated.
 * @return Returns true if the email is valid, otherwise returns false.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
function isValidEmail(email) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=emailValidation.js.map