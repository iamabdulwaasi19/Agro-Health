const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.register = async (req, res,) => {
  try {
    console.log("Request Body:", req.body);
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ fullName, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res,) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // In a real app, use Nodemailer here to send: 
  // `http://yourapp.com/reset/${token}`
  res.json({ message: "Reset token generated", token }); 
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // The token from the URL
    const { password } = req.body; // The new password from the user

    // 1. Find user with this token AND ensure token hasn't expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // $gt means "Greater Than"
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired." });
    }

    // 2. Set the new password 
    // (The User.js 'pre-save' hook will automatically hash this for you)
    user.password = password;

    // 3. Clear the reset fields so the token can't be used again
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ success: true, message: "Password has been successfully updated! 🚀" });

  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};