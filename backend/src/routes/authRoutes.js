const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload } = require('../utils/cloudinary');

router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/save-diagnosis', upload.single('image'), authController.saveDiagnosis);

module.exports = router;