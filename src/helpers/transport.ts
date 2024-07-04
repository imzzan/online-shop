import * as nodemailer from 'nodemailer';

const config = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: { rejectUnauthorized: false },
};

const transporter = nodemailer.createTransport(config);

export default transporter;
