const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const Scan = require('../models/Scan');
const authMiddleware = require('../middlewares/authMiddleware');
const scanController = require('../controllers/scanController');
const { analyzeImage } = require('../services/geminiServices'); 

router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

router.get('/history', authMiddleware, scanController.getUserHistory);

router.post('/diagnose', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // 1. Get AI Analysis
    const result = await analyzeImage(req.file.path, req.file.mimetype);
    
    // 2. Construct the permanent URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // 3. Save to Database so it's not lost
    const savedScan = await Scan.create({
      userId: req.user ? req.user.id : null, 
      imagePath: imageUrl,
      label: result.label,
      confidence: result.confidence,
      treatment: result.treatment
    });

    // 4. Return the result AND the image path to the frontend
    res.status(200).json({
      ...result,
      imagePath: imageUrl,
      scanId: savedScan._id
    });

  } catch (error) {
    console.error("Diagnosis Error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
       fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "AI Analysis failed", details: error.message });
  }
});

module.exports = router;