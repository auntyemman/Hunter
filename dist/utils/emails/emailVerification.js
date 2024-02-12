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
exports.emailVerification = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const nodeMailer_1 = require("../../configs/nodeMailer");
const emailVerification = (email, link) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = node_path_1.default.join(__dirname, 'htmlTemplate', 'emailVerification.html');
    const htmlContent = node_fs_1.default.readFileSync(templatePath, 'utf8');
    const processedHTML = htmlContent.replace('%LINK%', link);
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