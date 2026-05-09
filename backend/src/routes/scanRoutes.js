const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const Scan = require('../models/Scan');
const { authMiddleware } = require('../middlewares/authMiddleware');
const scanController = require('../controllers/scanController');
const { analyzeImage } = require('../services/geminiServices');
const { storage } = require('../utils/cloudinary');


router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

router.get('/history', authMiddleware, scanController.getUserHistory);

router.post('/diagnose', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // 1. Get AI Analysis
    const result = await analyzeImage(req.file.buffer, req.file.mimetype);
    
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
router.post('/save', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    // 1. Check if the image was uploaded to Cloudinary
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No image buffer provided" });
    }

    // 1. Upload the buffer to Cloudinary manually
    const uploadPromise = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'AgroHealth_Crops' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const cloudinaryResponse = await uploadPromise;

    const { label, confidence, treatment } = req.body;

    // 2. Use req.file.path (the Cloudinary URL) instead of imagePath
    const savedScan = await Scan.create({
      userId: req.user.id,
      imagePath: cloudinaryResponse.secure.url,
      label: label,
      confidence: confidence,
      treatment: typeof treatment === 'object' ? JSON.stringify(treatment) : treatment
    });

    res.status(201).json({ success: true, scanId: savedScan._id });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ error: "Could not save scan to history" });
  }
});

module.exports = router;