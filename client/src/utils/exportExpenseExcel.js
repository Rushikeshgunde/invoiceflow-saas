// ==========================================
// Imports
// ==========================================

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ==========================================
// Export Expenses to Excel
// ==========================================

const exportExpenseExcel = (expenses) => {
  // ==========================================
  // Prepare Data
  // ==========================================

  const excelData = expenses.map((expense) => ({
    Date: new Date(expense.expenseDate).toLocaleDateString("en-IN"),

    Title: expense.title,

    Category: expense.category,

    Vendor: expense.vendor || "-",

    Amount: Number(expense.amount || 0),

    Status: expense.status,

    "Payment Method": expense.paymentMethod || "-",

    "Reference No": expense.referenceNumber || "-",

    Notes: expense.notes || "-",
  }));

  // ==========================================
  // Worksheet
  // ==========================================

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // ==========================================
  // Column Width
  // ==========================================

  worksheet["!cols"] = [
    { wch: 15 }, // Date
    { wch: 25 }, // Title
    { wch: 18 }, // Category
    { wch: 22 }, // Vendor
    { wch: 12 }, // Amount
    { wch: 15 }, // Status
    { wch: 20 }, // Payment Method
    { wch: 22 }, // Reference No
    { wch: 35 }, // Notes
  ];

  // ==========================================
  // Workbook
  // ==========================================

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

  // ==========================================
  // Generate File
  // ==========================================

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Expense_Report.xlsx");
};

export default exportExpenseExcel;
