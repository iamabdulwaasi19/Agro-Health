const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"AgroHealth Support" <noreply@agrohealth.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your gmail
      pass: process.env.EMAIL_PASS, // Your App Password
    },
  });

  const mailOptions = {
    from: '"AgroHealth Support" <${process.env.EMAIL_USER}>',
    to: email,
    subject: 'Verify your AgroHealth Account',
    html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2 style="color: #1C8C36;">Welcome to AgroHealth!</h2>
        <p>Use the following code to verify your account. It expires in 10 minutes.</p>
        <h1 style="letter-spacing: 5px; font-size: 40px; color: #333;">${otp}</h1>
        <p>If you didn't create an account, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, sendOTPEmail };