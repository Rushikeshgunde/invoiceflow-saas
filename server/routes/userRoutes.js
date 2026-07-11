// ==========================================
// Imports
// ==========================================

const express = require("express");

const { getProfile, updateProfile } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const uploadProfile = require("../middleware/uploadProfile");
const { uploadProfileImage } = require("../controllers/userController");

const router = express.Router();

// ==========================================
// Routes
// ==========================================

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.post(
  "/profile/image",
  protect,
  uploadProfile.single("profileImage"),
  uploadProfileImage,
);

module.exports = router;
