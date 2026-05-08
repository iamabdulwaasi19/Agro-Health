const nodemailer = require('nodemailer');

// 1. Create a single transporter instance used by all functions
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});


const sendEmail = async (options) => {
  const mailOptions = {
    from: `"AgroHealth Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Supports both text and HTML
  };

  return await transporter.sendMail(mailOptions);
};


const sendOTPEmail = async (email, otp) => {
  const verifyUrl = `https://agro-health-chi.vercel.app/verify-otp?email=${email}`;
  
  const htmlContent = `
    <div style="font-family: sans-serif; text-align: center; padding: 20px; border: 1px solid #E6F4EA; border-radius: 12px;">
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
        If the button doesn't work, copy this link:<br>
        <a href="${verifyUrl}" style="color: #1C8C36;">${verifyUrl}</a>
      </p>
    </div>
  `;

  return await sendEmail({
    email: email,
    subject: 'Verify your AgroHealth Account',
    message: `Your OTP is ${otp}`, // Fallback for plain text
    html: htmlContent
  });
};

module.exports = { sendEmail, sendOTPEmail };