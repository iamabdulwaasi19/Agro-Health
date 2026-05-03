const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
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

    const result = await analyzeImage(req.file.path, req.file.mimetype);
    
    // Clean up file after AI processing
    // fs.unlink(req.file.path, (err) => {
      // if (err) console.error("Error deleting temp file:", err);
    // }
  // );

    res.status(200).json(result); 

  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ error: "AI Analysis failed", details: error.message });
  }
});

module.exports = router;