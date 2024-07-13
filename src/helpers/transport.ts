import * as nodemailer from 'nodemailer';

const config = {
  service: 'gmail',
  auth: {
    user: 'muhamadmuzani449@gmail.com',
    pass: 'jmfw sqai rois twcl',
  },
  tls: { rejectUnauthorized: false },
};

const transporter = nodemailer.createTransport(config);

export default transporter;
