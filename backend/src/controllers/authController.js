const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res,) => {
  try {
    console.log("Request Body:", req.body);
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ fullName, email, phoneNumber, state, password, confirmPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// exports.login = async (req, res,) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT Token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user: { id: user._id, email: user.email } });
//   } catch (err) {
//     console.error("DETAILED ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        state: user.state
      }
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