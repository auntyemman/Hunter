import { SendMailOptions } from 'nodemailer';

import { resetPasswordEmail } from './htmlTemplate/resetPassword';
import { transporter } from '../../configs/nodeMailer';

export const forgotPasswordMail = async (email: string, firstName: string, code: string) => {
  const processedHTML = resetPasswordEmail(firstName, code);

  const mailOptions: SendMailOptions = {
    from: `Hunter <smtp2@hrdek.com>`,
    to: email,
    subject: 'Your Hunter account password reset code',
    html: processedHTML,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {})
    .catch(() => {});
};
