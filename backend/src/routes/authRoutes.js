const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/signup', authController.register);
router.post('/login', authController.login);

// User registration and History
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);

// New Route: The user sends the new password to this URL
router.post('/reset-password/:token', authController.resetPassword);

// Only logged-in users can see their history
router.get('/history', authMiddleware, scanController.getUserHistory);

module.exports = router;