import { SendMailOptions } from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';

import { transporter } from '../../configs/nodeMailer';

export const emailVerification = async (email: string, link: string) => {
  const templatePath = path.join(__dirname, 'htmlTemplate', 'emailVerification.html');
  const htmlContent = fs.readFileSync(templatePath, 'utf8');
  const processedHTML = htmlContent.replace('%LINK%', link);

  const mailOptions: SendMailOptions = {
    from: `Hunter <auntyemman@gmail.com>`,
    to: email,
    subject: 'Verify your Hunter account',
    html: processedHTML,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch(() => {});
};
