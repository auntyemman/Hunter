import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

// const SMTPServer = process.env.SMTP_SERVER;
// const SMTPPort = process.env.SMTP_PORT;

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  //   host: SMTPServer,
  //   port: parseInt(SMTPPort || '465'),
  //   secure: true, // true for 465, false for other ports.
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});
