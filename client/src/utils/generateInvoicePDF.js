// ==========================================
// Imports
// ==========================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ==========================================
// Add Single Invoice Copy
// ==========================================

const addInvoiceCopy = (
  pdf,
  invoice,
  company,
  copyType,
  isFirstPage = false
) => {
  if (!isFirstPage) {
    pdf.addPage();
  }

  // ==========================================
  // Copy Label
  // ==========================================

  pdf.setFontSize(12);
  pdf.setTextColor(200, 0, 0);
  pdf.text(copyType, 160, 15);

  // ==========================================
  // Company
  // ==========================================

  pdf.setTextColor(0, 0, 0);

  pdf.setFontSize(20);
  pdf.text(company.companyName || "", 14, 20);

  pdf.setFontSize(10);

  pdf.text(company.address || "", 14, 28);
  pdf.text(company.phone || "", 14, 34);
  pdf.text(company.email || "", 14, 40);

  // ==========================================
  // Customer
  // ==========================================

  pdf.setFontSize(12);

  pdf.text("Bill To", 14, 55);

  pdf.setFontSize(10);

  pdf.text(
    invoice.customer?.customerName ||
      invoice.customer?.businessName ||
      "",
    14,
    63
  );

  pdf.text(invoice.customer?.email || "", 14, 69);

  // ==========================================
  // Invoice Details
  // ==========================================

  pdf.text(
    `Invoice : ${invoice.invoiceNumber}`,
    140,
    55
  );

  pdf.text(
    `Date : ${new Date(
      invoice.invoiceDate
    ).toLocaleDateString("en-IN")}`,
    140,
    61
  );

  pdf.text(
    `Due : ${new Date(
      invoice.dueDate
    ).toLocaleDateString("en-IN")}`,
    140,
    67
  );

  // ==========================================
  // Items
  // ==========================================

  autoTable(pdf, {
    startY: 80,

    head: [["Item", "Qty", "Rate", "Amount"]],

    body:
      invoice.items?.map((item) => [
        item.productName,
        item.quantity,
        item.rate,
        item.total,
      ]) || [],
  });

  // ==========================================
  // Total
  // ==========================================

  const finalY = pdf.lastAutoTable.finalY + 10;

  pdf.setFontSize(12);

  pdf.text(
    `Grand Total : ₹${invoice.grandTotal}`,
    140,
    finalY
  );
};

// ==========================================
// Generate PDF
// ==========================================

const generateInvoicePDF = (invoice, company) => {
  const pdf = new jsPDF();

  const copies = [
    "ORIGINAL",
    "DUPLICATE",
    "EXTRA COPY",
  ];

  copies.forEach((copy, index) => {
    addInvoiceCopy(
      pdf,
      invoice,
      company,
      copy,
      index === 0
    );
  });

  pdf.save(`${invoice.invoiceNumber}.pdf`);
};

export default generateInvoicePDF;