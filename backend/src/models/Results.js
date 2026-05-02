const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imagePath: { type: String, required: true },
  diagnosis: { type: String, required: true },
  status: { type: String },
  createdAt: { type: Date, default: Date.now }
});