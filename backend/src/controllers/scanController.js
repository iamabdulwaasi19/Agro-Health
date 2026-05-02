const Scan = require('../models/Scan');
const geminiService = require('../services/geminiServices');
const fs = require('fs').promises;

exports.analyzePlant = async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    console.log('📸 Analyzing image:', req.file.filename);

    const analysisResult = await geminiService.analyzeImage(filePath, req.file.mimetype);

    const savedScan = await Scan.create({
      userId: req.user.id,
      imagePath: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      label: analysisResult.label,
      confidence: analysisResult.confidence,
      treatment: analysisResult.treatment
    });

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

exports.getUserHistory = async (req, res) => {
  try {
    const history = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
};