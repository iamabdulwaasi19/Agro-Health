const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const scanController = require('../controllers/scanController');


// 1. IMPORT FROM SERVICES FOLDER
const { analyzeImage } = require('../services/geminiServices'); 

router.post('/diagnose', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // 2. Call the gemini AI function
    const result = await analyzeImage(req.file.path, req.file.mimetype);
    
    // 3. CLEAN UP: Delete the image from the server after Gemini is done
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    // 4. SEND JSON TO FRONTEND
    res.status(200).json(result); 

  } catch (error) {
    console.error("Diagnosis Route Error:", error.message);
    
    // If it fails, still try to delete the temp file
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(500).json({ 
      error: "AI Analysis failed", 
      details: error.message 
    });
  }
});

module.exports = router;