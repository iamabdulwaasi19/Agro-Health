// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const upload = require('../middlewares/multerMiddleware');
// const scanController = require('../controllers/scanController');
// const authMiddleware = require('../middlewares/authMiddleware');


// // Only logged-in users can scan
// router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

// // 1. IMPORT FROM SERVICES FOLDER
// const { analyzeImage } = require('../services/geminiServices'); 

// router.post('/diagnose', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided." });
//     }

//     // 2. Call the gemini AI function
//     const result = await analyzeImage(req.file.path, req.file.mimetype);
    
//     // 3. CLEAN UP: Delete the image from the server after Gemini is done
//     fs.unlink(req.file.path, (err) => {
//       if (err) console.error("Error deleting temp file:", err);
//     });

//     // 4. SEND JSON TO FRONTEND
//     res.status(200).json(result); 

//   } catch (error) {
//     console.error("Diagnosis Route Error:", error.message);
    
//     // If it fails, still try to delete the temp file
//     if (req.file) {
//       fs.unlink(req.file.path, () => {});
//     }

//     res.status(500).json({ 
//       error: "AI Analysis failed", 
//       details: error.message 
//     });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multerMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const scanController = require('../controllers/scanController');
const { analyzeImage } = require('../services/geminiServices'); 

// 1. Private Scan (Saves to user history)
// URL: /api/scan/analyze
router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

// 2. Private History 
// URL: /api/scan/history
router.get('/history', authMiddleware, scanController.getUserHistory);

// 3. Public Scan (Quick check, no login required)
// URL: /api/scan/diagnose
router.post('/diagnose', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    const result = await analyzeImage(req.file.path, req.file.mimetype);
    
    // Clean up file after AI processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.status(200).json(result); 

  } catch (error) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ error: "AI Analysis failed", details: error.message });
  }
});

module.exports = router;