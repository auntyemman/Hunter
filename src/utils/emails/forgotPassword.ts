import { SendMailOptions } from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

import { transporter } from '../../configs/nodeMailer';

export const forgotPasswordMail = async (email: string, code: string) => {
  const templatePath = path.join(__dirname, 'htmlTemplate', 'resetPassword.html');
  const htmlContent = fs.readFileSync(templatePath, 'utf8');
  const processedHTML = htmlContent.replace('%OTP_CODE%', code);

  const mailOptions: SendMailOptions = {
    from: `Marketing Campaign <smtp2@hrdek.com>`,
    to: email,
    subject: 'Your Campaign account password reset code',
    html: processedHTML,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch(() => {});
};
