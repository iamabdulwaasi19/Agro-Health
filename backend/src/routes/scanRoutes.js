const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const Scan = require('../models/Scan');
const authMiddleware = require('../middlewares/authMiddleware');
const scanController = require('../controllers/scanController');
const { analyzeImage } = require('../services/geminiServices');
const { upload } = require('../utils/cloudinary');


router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

router.get('/history', authMiddleware, scanController.getUserHistory);

router.post('/diagnose', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // 1. Get AI Analysis
    const result = await analyzeImage(req.file.path, req.file.mimetype);
    
    // 2. Construct the permanent URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // ... inside the try block after getting 'result' from AI
const treatmentText = typeof result.treatment === 'object' 
  ? JSON.stringify(result.treatment) 
  : result.treatment;

    // 4. Return the result AND the image path to the frontend
    res.status(200).json({
      ...result,
      imagePath: imageUrl,
      scanId: null
    });

  } catch (error) {
    console.error("Diagnosis Error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
       fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "AI Analysis failed", details: error.message });
  }
});

// This route is only called when the "Save Result" button is clicked
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { label, confidence, imagePath, treatment } = req.body;

    const treatmentText = typeof treatment === 'object' 
      ? JSON.stringify(treatment) 
      : treatment;

    const savedScan = await Scan.create({
      userId: req.user.id, // Now it's linked to the logged-in user!
      imagePath: imagePath,
      label: label,
      confidence: confidence,
      treatment: treatmentText
    });

    res.status(201).json({ success: true, scanId: savedScan._id });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ error: "Could not save scan to history" });
  }
});

// In your routes file:
router.post('/save-diagnosis', upload.single('image'), async (req, res) => {
  try {
    // req.file.path contains the permanent HTTPS URL from Cloudinary
    const imageUrl = req.file.path; 
    
    const newDiagnosis = new Diagnosis({
      userId: req.user.id,
      image: imageUrl,
      diseaseName: req.body.diseaseName,
      confidence: req.body.confidence,
    });

    await newDiagnosis.save();
    res.status(201).json(newDiagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;