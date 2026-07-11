// ==========================================
// Imports
// ==========================================

const multer = require("multer");

const path = require("path");

// ==========================================
// Storage
// ==========================================

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/profile");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

// ==========================================
// Upload
// ==========================================

module.exports = multer({
  storage,
});