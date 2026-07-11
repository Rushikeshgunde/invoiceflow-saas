const multer = require("multer");
const path = require("path");

// ==========================================
// Storage
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/logos");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

// ==========================================
// File Filter
// ==========================================

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/;

  const ext = allowed.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mime = allowed.test(file.mimetype);

  if (ext && mime) {
    return cb(null, true);
  }

  cb(new Error("Only images allowed."));
};

module.exports = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});