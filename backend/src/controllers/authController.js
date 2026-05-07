const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmails');
const { sendOTPEmail } = require('../utils/sendEmails');

exports.register = async (req, res,) => {
  try {
    console.log("Request Body:", req.body);
    const { fullName, phoneNumber, state, email, password, confirmPassword } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    const user = new User({ fullName, email, phoneNumber, state, password, confirmPassword, otp, otpExpires });
    await user.save();

    // 4. Send the OTP Email
    try {
      await sendOTPEmail(user.email, otp);
      res.status(201).json({ 
        message: 'Registration successful! Please check your email for the verification code.' 
      });
    } catch (mailErr) {
      console.error("Email sending failed:", mailErr);
      // We still created the user, but told them email failed.
      res.status(201).json({ 
        message: 'Account created, but verification email failed to send. Please try Resend OTP.' 
      });
    }
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      return res.status(403).json({ 
        message: 'Your account is not verified. Please check your email for the OTP.',
        notVerified: true
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, email: user.email, fullName: user.fullName, } });

  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://https://agro-health-chi.vercel.app/reset-password/${token}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of a password.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetUrl} \n\n If you did not request this, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'AgroHealth Password Reset',
        message,
      });

      res.status(200).json({ message: "Email sent to " + user.email });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired." });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: "Password has been successfully updated! 🚀" });

  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // 2. Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // 3. Success! Update the user
    user.isVerified = true;
    user.otp = undefined; // Clear the OTP fields now that they're done
    user.otpExpires = undefined;
    
    await user.save();

    res.status(200).json({ message: "Account verified successfully! You can now log in." });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "This account is already verified. Please login." });
    }

    // 1. Generate new OTP and fresh expiry
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpires = Date.now() + 10 * 60 * 1000; 

    // 2. Update user document
    user.otp = newOtp;
    user.otpExpires = newOtpExpires;
    await user.save();

    // 3. Send the new email
    await sendOTPEmail(user.email, newOtp);

    res.status(200).json({ message: "A new OTP has been sent to your email." });

  } catch (err) {
    console.error("RESEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.saveDiagnosis = async (req, res) => {
  try {
    // 1. req.file is created by Multer/Cloudinary. 
    // .path is the permanent URL (https://res.cloudinary.com/...)
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { label, confidence, treatment } = req.body;

    // 2. Create the document for your MongoDB
    // Assuming your model is named 'Diagnosis'
    const newDiagnosis = new Diagnosis({
      userId: req.user.id, // From your auth middleware
      image: req.file.path, // THIS IS THE FIX: The permanent Cloudinary link
      diseaseName: label,
      confidence: confidence,
      treatment: typeof treatment === 'string' ? JSON.parse(treatment) : treatment,
      date: new Date()
    });

    // 3. Save to MongoDB
    await newDiagnosis.save();

    res.status(201).json({
      success: true,
      message: "Diagnosis saved permanently!",
      data: newDiagnosis
    });

  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};