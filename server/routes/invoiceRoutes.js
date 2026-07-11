// ==========================================
// Imports
// ==========================================

const express = require("express");

const router = express.Router();

const {createInvoice,getInvoices,deleteInvoice,updateInvoice} = require("../controllers/invoiceController");

const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// Routes
// ==========================================

// Create Invoice
router.post("/", authMiddleware, createInvoice);

// Get All Invoices
router.get("/", authMiddleware, getInvoices);

//delete invoice
router.delete("/:id", authMiddleware, deleteInvoice);

//update invoice
router.put("/:id", authMiddleware, updateInvoice);

// ==========================================
// Export
// ==========================================

module.exports = router;
