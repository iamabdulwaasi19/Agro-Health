const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const scanController = require('../controllers/scanController');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// New Route: The user sends the new password to this URL
router.post('/reset-password/:token', authController.resetPassword);

// Only logged-in users can scan
router.post('/analyze', authMiddleware, upload.single('image'), scanController.analyzePlant);

// Only logged-in users can see their history
router.get('/history', authMiddleware, scanController.getUserHistory);

module.exports = router;