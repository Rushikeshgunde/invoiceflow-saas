// ==========================================
// Imports
// ==========================================

const Expense = require("../models/Expense");
const createNotification = require("../utils/createNotification");
// ==========================================
// Create Expense
// ==========================================

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user.id,
    });

     await createNotification({
  user: req.user.id,
  title: "Expense Added",
  message: `${expense.title} added successfully.`,
  type: "expense",
});

    res.status(201).json({
      success: true,
      message: "Expense created successfully.",
      expense,
    });

   

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==========================================
// Get All Expenses
// ==========================================

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({
      expenseDate: -1,
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Single Expense
// ==========================================

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Expense
// ==========================================

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully.",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Expense
// ==========================================

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Expense Summary
// ==========================================

const getExpenseSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.totalAmount,
      0,
    );

    const paidExpenses = expenses
      .filter((expense) => expense.status === "Paid")
      .reduce((sum, expense) => sum + expense.totalAmount, 0);

    const pendingExpenses = expenses
      .filter((expense) => expense.status === "Pending")
      .reduce((sum, expense) => sum + expense.totalAmount, 0);

    res.status(200).json({
      success: true,
      summary: {
        totalExpenses,
        paidExpenses,
        pendingExpenses,
        totalRecords: expenses.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Export
// ==========================================

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
};
