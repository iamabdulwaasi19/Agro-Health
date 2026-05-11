const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Getting all user information on registration
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  phoneNumber: { type: String, required: true },
  state: { type: String, required: true },
  location: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
