const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { uploads } = require("../utils/cloudinary");
const { protect } = require("../middlewares/authMiddleware");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resend-otp", authController.resendOTP);
router.get("/user", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.put("/change-password", protect, authController.changePassword);

module.exports = router;
