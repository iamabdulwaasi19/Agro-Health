const mongoose = require("mongoose");

// Making sure only logged in Users are allowed to scan
const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imagePath: { type: String, required: true },
  label: String,
  confidence: Number,
  treatment: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Scan", scanSchema);
