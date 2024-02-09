import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});
