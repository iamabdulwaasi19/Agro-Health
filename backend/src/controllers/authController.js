const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmails");
const { sendOTPEmail } = require("../utils/sendEmails");

exports.register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      fullName,
      phoneNumber,
      state,
      location,
      email,
      password,
      confirmPassword,
    } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    const user = new User({
      fullName,
      email,
      phoneNumber,
      state,
      location,
      password,
      confirmPassword,
      otp,
      otpExpires,
    });
    await user.save();

    // Send the registration OTP Email
    try {
      await sendOTPEmail(user.email, otp);
      res.status(201).json({
        message:
          "Registration successful! Please check your email for the verification code.",
      });
    } catch (mailErr) {
      console.error("Email sending failed:", mailErr);

      // User created but Email fails to send.
      res.status(201).json({
        message:
          "Account created, but verification email failed to send. Please try Resend OTP.",
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
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // User not yet verified
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Your account is not verified. Please check your email for the OTP.",
        notVerified: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, email: user.email, fullName: user.fullName },
    });
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

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://https://agro-health-chi.vercel.app/reset-password/${token}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of a password.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetUrl} \n\n If you did not request this, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "AgroHealth Password Reset",
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
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired." });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password has been successfully updated! 🚀",
    });
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

    // Check if OTP matches the one sent to User
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }

    // Check if Users OTP has expired
    if (Date.now() > user.otpExpires) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    // Success! Update the user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res
      .status(200)
      .json({ message: "Account verified successfully! You can now log in." });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
// In case first OTP is not delivered
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "This account is already verified. Please login." });
    }

    // Generate new OTP and fresh expiry
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpires = Date.now() + 10 * 60 * 1000;

    // Update user document
    user.otp = newOtp;
    user.otpExpires = newOtpExpires;
    await user.save();

    // Send the new email
    await sendOTPEmail(user.email, newOtp);

    res.status(200).json({ message: "A new OTP has been sent to your email." });
  } catch (err) {
    console.error("RESEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Gets the logged-in user's profile data
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires",
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Updates the logged-in user's profile (name, phone, state, location)
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, state, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phoneNumber, state, location },
      { new: true, runValidators: true },
    ).select(
      "-password -otp -otpExpires -resetPasswordToken -resetPasswordExpires",
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// Changes password while logged in (requires current password verification)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Fetch user with password field included
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Assign new password and save
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
