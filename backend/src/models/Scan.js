const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  // This links the scan to a specific user ID
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  imagePath: { type: String, required: true },
  label: String,
  confidence: Number,
  treatment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);