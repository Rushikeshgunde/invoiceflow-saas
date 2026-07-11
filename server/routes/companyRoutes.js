// import { uploadLogo } from "../controllers/companyController";

const express = require("express");

const {
  getCompany,
  createCompany,
  updateCompany,
  uploadLogo,
  uploadSignature,
} = require("../controllers/companyController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==========================================
// Company Routes
// ==========================================

// Get Company
router.get("/", protect, getCompany);

// Create Company
router.post("/", protect, createCompany);

// Update Company
router.put("/", protect, updateCompany);

router.post("/logo", protect, upload.single("logo"), uploadLogo);

router.post("/signature", protect, upload.single("signature"), uploadSignature);

module.exports = router;
