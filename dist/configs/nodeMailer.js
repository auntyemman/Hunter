"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const SMTPServer = process.env.SMTP_SERVER;
// const SMTPPort = process.env.SMTP_PORT;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
exports.transporter = nodemailer_1.default.createTransport({
    //   host: SMTPServer,
    //   port: parseInt(SMTPPort || '465'),
    //   secure: true, // true for 465, false for other ports.
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
});
//# sourceMappingURL=nodeMailer.js.map