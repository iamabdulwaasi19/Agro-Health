const Scan = require('../models/Scan');
const geminiService = require('../services/geminiServices');
const fs = require('fs').promises;

exports.analyzePlant = async (req, res) => {
  const filePath = req.file?.path;

  try {
    // 1. Check if an image was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    console.log('📸 Analyzing image:', req.file.filename);

    // 2. Call the Gemini Service to analyze the image
    const analysisResult = await geminiService.analyzeImage(filePath, req.file.mimetype);

    // 3. TODO: Save to Database (e.g., const savedScan = await Scan.create(...))
    const savedScan = await Scan.create({
      userId: req.user.id,
      imagePath: `/uploads/${req.file.filename}`,
      label: analysisResult.label,
      confidence: analysisResult.confidence,
      treatment: analysisResult.treatment
    });

    // 4. Send the result back to the frontend
    res.json({
      success: true,
      data: analysisResult,
      imagePath: `/uploads/${req.file.filename}`
    });

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to analyze plant', details: error.message });
  }
};

// NEW: Function to get all scans for the logged-in user
exports.getUserHistory = async (req, res) => {
  try {
    const history = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
};