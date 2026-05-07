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
    from: `"AgroHealth Support" <noreply@agrohealth.com>`,
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// Define your frontend URL (your Vercel link)
  const verifyUrl = `https://agro-health-chi.vercel.app/verify-otp?email=${email}`;

  const mailOptions = {
    from: `"AgroHealth Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your AgroHealth Account',
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #E6F4EA; rounded-xl;">
        <h2 style="color: #1C8C36;">Welcome to AgroHealth!</h2>
        <p>Use the following code to verify your account. It expires in 10 minutes.</p>
        <h1 style="letter-spacing: 5px; font-size: 40px; color: #333; margin: 20px 0;">${otp}</h1>
        
        <div style="margin: 30px 0;">
          <a href="${verifyUrl}" 
             style="background-color: #1C8C36; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Verify Account Now
          </a>
        </div>
        
        <p style="font-size: 12px; color: #6B7280;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${verifyUrl}" style="color: #1C8C36;">${verifyUrl}</a>
        </p>
        <p style="margin-top: 20px; font-size: 14px;">If you didn't create an account, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, sendOTPEmail };