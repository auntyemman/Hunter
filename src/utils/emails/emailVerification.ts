import { SendMailOptions } from 'nodemailer';

import { emailVerificationTemplate } from './htmlTemplate/emailVerification';
import { transporter } from '../../configs/nodeMailer';

export const emailVerification = async (email: string, firstName: string, link: string) => {
  const processedHTML = emailVerificationTemplate(firstName, link);

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
