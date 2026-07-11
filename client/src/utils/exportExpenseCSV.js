// ==========================================
// Export Expenses to CSV
// ==========================================

const exportExpenseCSV = (expenses) => {
  // ==========================================
  // CSV Header
  // ==========================================

  const headers = [
    "Date",
    "Title",
    "Category",
    "Vendor",
    "Amount",
    "Status",
    "Payment Method",
    "Reference Number",
    "Notes",
  ];

  // ==========================================
  // CSV Rows
  // ==========================================

  const rows = expenses.map((expense) => [
    new Date(expense.expenseDate).toLocaleDateString("en-IN"),
    expense.title,
    expense.category,
    expense.vendor || "-",
    expense.amount,
    expense.status,
    expense.paymentMethod || "-",
    expense.referenceNumber || "-",
    expense.notes || "-",
  ]);

  // ==========================================
  // Convert to CSV String
  // ==========================================

  const csvContent = [headers, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(","))
    .join("\n");

  // ==========================================
  // Download CSV
  // ==========================================

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "Expense_Report.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export default exportExpenseCSV;
