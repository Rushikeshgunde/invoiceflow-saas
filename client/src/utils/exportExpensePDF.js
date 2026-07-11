// ==========================================
// Imports
// ==========================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ==========================================
// Export Expense PDF
// ==========================================

const exportExpensePDF = (expenses) => {
  const doc = new jsPDF();

  // ==========================================
  // Title
  // ==========================================

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Expense Report", 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 25);

  // ==========================================
  // Table
  // ==========================================

  autoTable(doc, {
    startY: 32,

    head: [["Date", "Title", "Category", "Vendor", "Amount", "Status"]],

    body: expenses.map((expense) => [
      new Date(expense.expenseDate).toLocaleDateString("en-IN"),
      expense.title,
      expense.category,
      expense.vendor || "-",
      `₹${Number(expense.amount).toLocaleString("en-IN")}`,
      expense.status,
    ]),

    theme: "grid",

    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
  });

  // ==========================================
  // Total Expenses
  // ==========================================

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );

  const finalY = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  doc.text(`Total Expenses : ₹${total.toLocaleString("en-IN")}`, 14, finalY);

  // ==========================================
  // Save
  // ==========================================

  doc.save("Expense_Report.pdf");
};

export default exportExpensePDF;
