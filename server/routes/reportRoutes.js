const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSummaryReport,
  getRevenueReport,
  getInvoiceReport,
  getPaymentReport,
  getCustomerReport,
  getProductReport,

} = require("../controllers/reportController");

// ==========================================
// Routes
// ==========================================

router.get("/summary", protect, getSummaryReport);

router.get("/revenue", protect, getRevenueReport);

router.get("/invoices", protect, getInvoiceReport);

router.get("/payments", protect, getPaymentReport);

router.get("/customers", protect, getCustomerReport);

router.get("/products", protect, getProductReport);


// ==========================================

module.exports = router;
