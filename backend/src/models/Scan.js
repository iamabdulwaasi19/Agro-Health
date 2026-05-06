// const mongoose = require('mongoose');

// const scanSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: false 
//   },
//   imagePath: { type: String, required: true },
//   label: String,
//   confidence: Number,
//   treatment: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Scan', scanSchema);

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
  // Change String to Mixed or Object to handle the AI's complex response
  treatment: mongoose.Schema.Types.Mixed, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);