
const express = require("express");

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// Router
// ==========================================

const router = express.Router();

// ==========================================
// Routes
// ==========================================

// Create Expense
router.post("/", protect, createExpense);

// Get All Expenses
router.get("/", protect, getExpenses);

// Get Single Expense
router.get("/:id", protect, getExpenseById);

// Update Expense
router.put("/:id", protect, updateExpense);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

// ==========================================
// Export
// ==========================================

module.exports = router;
