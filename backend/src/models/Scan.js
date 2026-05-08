const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false // Correctly set to false to allow guest scans
  },
  imagePath: { type: String, required: true },
  label: String,
  confidence: Number,
  treatment: mongoose.Schema.Types.Mixed, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);