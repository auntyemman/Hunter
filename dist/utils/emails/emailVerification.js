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
exports.emailVerification = void 0;
const emailVerification_1 = require("./htmlTemplate/emailVerification");
const nodeMailer_1 = require("../../configs/nodeMailer");
const emailVerification = (email, firstName, link) => __awaiter(void 0, void 0, void 0, function* () {
    const processedHTML = (0, emailVerification_1.emailVerificationTemplate)(firstName, link);
    const mailOptions = {
        from: `Hunter <auntyemman@gmail.com>`,
        to: email,
        subject: 'Verify your Hunter account',
        html: processedHTML,
    };
    nodeMailer_1.transporter
        .sendMail(mailOptions)
        .then(() => { })
        .catch(() => { });
});
exports.emailVerification = emailVerification;
//# sourceMappingURL=emailVerification.js.map