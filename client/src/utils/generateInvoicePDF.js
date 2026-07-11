// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";



// const generateInvoicePDF = (invoice, company) => {
//     console.log("Company in PDF:", company);
//   const doc = new jsPDF();
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 14;

//   // Brand colors
//   const primaryColor = [37, 99, 235]; // #2563eb
//   const darkText = [17, 24, 39]; // #111827
//   const grayText = [107, 114, 128]; // #6b7280
//   const lightGray = [243, 244, 246]; // #f3f4f6

//   // Status color map
//   const statusColors = {
//     Paid: [22, 163, 74], // green
//     Pending: [217, 119, 6], // amber
//     Overdue: [220, 38, 38], // red
//     Unpaid: [220, 38, 38],
//   };
//   const statusColor = statusColors[invoice.paymentStatus] || grayText;

//   // ==========================================
//   // Header band (colored rectangle background)
//   // ==========================================
//   doc.text(company.companyName, 14, 18);
//   console.log(company.companyName);

//   doc.setFillColor(...primaryColor);
//   doc.rect(0, 0, pageWidth, 40, "F");

//   // ==========================================
// // Company Logo
// // ==========================================

// if (company?.logo) {
//   try {
//     const logoUrl = `http://localhost:5000/uploads/logos/${company.logo}`;

//     doc.addImage(
//       logoUrl,
//       "PNG",
//       pageWidth - 34,
//       6,
//       18,
//       18
//     );
//   } catch (error) {
//     console.log("Logo not loaded");
//   }
// }

//   // Company name (white text on colored band)
//   doc.setFontSize(22);
//   doc.setTextColor(255, 255, 255);
//   doc.setFont("helvetica", "bold");

//   doc.text(
//   company?.companyName || "InvoiceFlow",
//   margin,
//   18
// );

//   doc.setFontSize(9);
//   doc.setFont("helvetica", "normal");

//   doc.text(
//   company?.gstNumber || "",
//   margin,
//   25
// );

// doc.text(
//   `${company?.address || ""}, ${company?.city || ""}, ${company?.state || ""} - ${company?.pincode || ""}`,
//   margin,
//   31
// );

// doc.text(
//   `${company?.email || ""} | ${company?.phone || ""}`,
//   margin,
//   36
// );

// if (company?.website) {
//   doc.text(company.website, margin, 41);
// }

//   // "TAX INVOICE" label on right side of band
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("TAX INVOICE", pageWidth - margin, 18, { align: "right" });

//   doc.setFontSize(10);
//   doc.setFont("helvetica", "normal");
//   doc.text(`# ${invoice.invoiceNumber}`, pageWidth - margin, 25, {
//     align: "right",
//   });

//   // ==========================================
//   // Invoice meta box (below header, right aligned)
//   // ==========================================

//   const metaBoxY = 48;
//   const metaBoxWidth = 70;
//   const metaBoxX = pageWidth - margin - metaBoxWidth;

//   doc.setDrawColor(229, 231, 235);
//   doc.setFillColor(...lightGray);
//   doc.roundedRect(metaBoxX, metaBoxY, metaBoxWidth, 32, 2, 2, "FD");

//   doc.setFontSize(9);
//   doc.setTextColor(...grayText);
//   doc.text("Invoice Date", metaBoxX + 5, metaBoxY + 8);
//   doc.text("Due Date", metaBoxX + 5, metaBoxY + 17);
//   doc.text("Status", metaBoxX + 5, metaBoxY + 26);

//   doc.setTextColor(...darkText);
//   doc.setFont("helvetica", "bold");
//   doc.text(
//     new Date(invoice.invoiceDate).toLocaleDateString("en-IN"),
//     metaBoxX + metaBoxWidth - 5,
//     metaBoxY + 8,
//     { align: "right" },
//   );
//   doc.text(
//     new Date(invoice.dueDate).toLocaleDateString("en-IN"),
//     metaBoxX + metaBoxWidth - 5,
//     metaBoxY + 17,
//     { align: "right" },
//   );

//   // Status badge (colored pill)
//   doc.setFillColor(...statusColor);
//   const statusText = invoice.paymentStatus || "-";
//   const statusTextWidth = doc.getTextWidth(statusText) + 8;
//   doc.roundedRect(
//     metaBoxX + metaBoxWidth - 5 - statusTextWidth,
//     metaBoxY + 21,
//     statusTextWidth,
//     6,
//     1.5,
//     1.5,
//     "F",
//   );
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(8);
//   doc.text(
//     statusText,
//     metaBoxX + metaBoxWidth - 5 - statusTextWidth / 2,
//     metaBoxY + 25,
//     { align: "center" },
//   );

//   // ==========================================
//   // Bill To box (left side, same row as meta box)
//   // ==========================================

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(10);
//   doc.setTextColor(...primaryColor);
//   doc.text("BILL TO", margin, metaBoxY + 5);

//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(11);
//   doc.setTextColor(...darkText);
//   doc.text(
//     invoice.customer?.customerName || invoice.customer?.businessName || "-",
//     margin,
//     metaBoxY + 13,
//   );

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(...grayText);

//   let customerLineY = metaBoxY + 20;
//   if (invoice.customer?.phone) {
//     doc.text(invoice.customer.phone, margin, customerLineY);
//     customerLineY += 6;
//   }
//   if (invoice.customer?.email) {
//     doc.text(invoice.customer.email, margin, customerLineY);
//   }

//   // ==========================================
//   // Items Table
//   // ==========================================

//   autoTable(doc, {
//     startY: metaBoxY + 40,

//     head: [["Product", "SKU", "Qty", "Price", "GST %", "Total"]],

//     body: invoice.items.map((item) => [
//       item.product?.productName || "-",
//       item.sku,
//       item.quantity,
//       `Rs. ${Number(item.price).toLocaleString("en-IN")}`,
//       `${item.gst}%`,
//       `Rs. ${Number(item.total).toLocaleString("en-IN")}`,
//     ]),

//     theme: "striped",

//     styles: {
//       fontSize: 9,
//       cellPadding: 4,
//       textColor: darkText,
//     },

//     headStyles: {
//       fillColor: primaryColor,
//       textColor: [255, 255, 255],
//       fontStyle: "bold",
//       halign: "left",
//     },

//     alternateRowStyles: {
//       fillColor: [249, 250, 251],
//     },

//     columnStyles: {
//       2: { halign: "center" }, // Qty
//       3: { halign: "right" }, // Price
//       4: { halign: "center" }, // GST %
//       5: { halign: "right" }, // Total
//     },

//     margin: { left: margin, right: margin },
//   });

//   // ==========================================
//   // Totals box (right aligned, bordered)
//   // ==========================================

//   const finalY = doc.lastAutoTable.finalY + 8;
//   const totalsBoxWidth = 75;
//   const totalsBoxX = pageWidth - margin - totalsBoxWidth;

//   doc.setFontSize(10);
//   doc.setFont("helvetica", "normal");
//   doc.setTextColor(...grayText);

//   doc.text("Subtotal", totalsBoxX, finalY + 6);
//   doc.text(
//     `Rs. ${Number(invoice.subtotal).toLocaleString("en-IN")}`,
//     pageWidth - margin,
//     finalY + 6,
//     { align: "right" },
//   );

//   doc.text("GST", totalsBoxX, finalY + 14);
//   doc.text(
//     `Rs. ${Number(invoice.gstTotal).toLocaleString("en-IN")}`,
//     pageWidth - margin,
//     finalY + 14,
//     { align: "right" },
//   );

//   // Divider line above grand total
//   doc.setDrawColor(229, 231, 235);
//   doc.line(totalsBoxX, finalY + 19, pageWidth - margin, finalY + 19);

//   // Grand total (highlighted)
//   let notesEndY = finalY + 45;
//   doc.setFillColor(...primaryColor);
//   doc.roundedRect(totalsBoxX, finalY + 23, totalsBoxWidth, 12, 1.5, 1.5, "F");

//   doc.setFontSize(11);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(255, 255, 255);
//   doc.text("Grand Total", totalsBoxX + 4, finalY + 30.5);
//   doc.text(
//     `Rs. ${Number(invoice.grandTotal).toLocaleString("en-IN")}`,
//     pageWidth - margin - 4,
//     finalY + 30.5,
//     { align: "right" },
//   );

//   // ==========================================
//   // Notes
//   // ==========================================

//   // ==========================================
// // Terms & Conditions
// // ==========================================

// if (company?.terms) {
//   doc.setFontSize(10);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(...primaryColor);

//   doc.text("Terms & Conditions", margin, notesEndY + 10);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(9);
//   doc.setTextColor(...grayText);

//   const terms = doc.splitTextToSize(
//     company.terms,
//     pageWidth - margin * 2
//   );

//   doc.text(terms, margin, notesEndY + 17);

//   notesEndY += terms.length * 5 + 15;
// }
// // ------------------------------------------------------------------
// // ==========================================
// // Bank Details
// // ==========================================

// doc.setFontSize(10);
// doc.setFont("helvetica", "bold");
// doc.setTextColor(...primaryColor);

// doc.text("Bank Details", margin, notesEndY + 10);

// doc.setFont("helvetica", "normal");
// doc.setFontSize(9);
// doc.setTextColor(...grayText);

// doc.text(
//   `Bank : ${company?.bankName || "-"}`,
//   margin,
//   notesEndY + 17
// );

// doc.text(
//   `A/C Holder : ${company?.accountHolder || "-"}`,
//   margin,
//   notesEndY + 23
// );

// doc.text(
//   `Account No : ${company?.accountNumber || "-"}`,
//   margin,
//   notesEndY + 29
// );

// doc.text(
//   `IFSC : ${company?.ifscCode || "-"}`,
//   margin,
//   notesEndY + 35
// );

// doc.text(
//   `UPI : ${company?.upiId || "-"}`,
//   margin,
//   notesEndY + 41
// );

// //   let notesEndY = finalY + 45;

//   if (invoice.notes) {
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(...primaryColor);
//     doc.text("Notes", margin, finalY + 40);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.setTextColor(...grayText);

//     const splitNotes = doc.splitTextToSize(
//       invoice.notes,
//       pageWidth - margin * 2,
//     );
//     doc.text(splitNotes, margin, finalY + 47);

//     notesEndY = finalY + 47 + splitNotes.length * 5;
//   }


//   // ==========================================
// // Signature
// // ==========================================

// doc.setFontSize(10);
// doc.setTextColor(...darkText);

// doc.text(
//   "Authorized Signature",
//   pageWidth - 65,
//   pageHeight - 28
// );
//   // ==========================================
//   // Footer (fixed at bottom of page)
//   // ==========================================

//   doc.setDrawColor(229, 231, 235);
//   doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

//   doc.setFontSize(9);
//   doc.setTextColor(...grayText);
//   doc.setFont("helvetica", "italic");
//   doc.text("Thank you for your business!", margin, pageHeight - 13);

//   doc.setFont("helvetica", "normal");
//   doc.text("Generated by InvoiceFlow", pageWidth - margin, pageHeight - 13, {
//     align: "right",
//   });

//   // ==========================================
//   // Save
//   // ==========================================

//   doc.save(`${invoice.invoiceNumber}.pdf`);
// };

// export default generateInvoicePDF;






import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Converts a number to words (Indian numbering system) for "Total in words"
const numberToWords = (num) => {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
    "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy",
    "Eighty", "Ninety",
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000)
      return (
        a[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 ? " " + inWords(n % 100) : "")
      );
    if (n < 100000)
      return (
        inWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 ? " " + inWords(n % 1000) : "")
      );
    if (n < 10000000)
      return (
        inWords(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 ? " " + inWords(n % 100000) : "")
      );
    return (
      inWords(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 ? " " + inWords(n % 10000000) : "")
    );
  };

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let result = rupees === 0 ? "Zero" : inWords(rupees) + " Rupees";
  if (paise > 0) {
    result += " and " + inWords(paise) + " Paise";
  }
  return result + " Only";
};

const generateInvoicePDF = (invoice, company) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Colors
  const primaryColor = [37, 99, 235]; // #2563eb
  const darkText = [30, 41, 59]; // #1e293b
  const grayText = [100, 116, 139]; // #64748b
  const lineColor = [203, 213, 225]; // #cbd5e1
  const greenText = [22, 163, 74]; // total amount highlight

  let cursorY = 18;

  // ==========================================
  // Logo (top-left)
  // ==========================================

  let textStartX = margin;

  if (company?.logo) {
    try {
      const logoUrl = `http://localhost:5000/uploads/logos/${company.logo}`;
      doc.addImage(logoUrl, "PNG", margin, 12, 20, 20);
      textStartX = margin + 26; // push company text right of logo
    } catch (error) {
      console.log("Logo not loaded");
    }
  }

  // ==========================================
  // Company Info (top-left, next to logo)
  // ==========================================

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text(company?.companyName || "Your Company", textStartX, cursorY);
  cursorY += 6;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);

  if (company?.gstNumber) {
    doc.text(`GSTIN: ${company.gstNumber}`, textStartX, cursorY);
    cursorY += 4.5;
  }

  const contactLine = [
    company?.phone ? `Ph: +91-${company.phone}` : null,
    company?.email ? `Email: ${company.email}` : null,
  ]
    .filter(Boolean)
    .join("  |  ");

  if (contactLine) {
    doc.text(contactLine, textStartX, cursorY);
    cursorY += 4.5;
  }

  const addressLine = [
    company?.address,
    company?.city,
    company?.state,
    company?.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  if (addressLine) {
    const splitAddress = doc.splitTextToSize(addressLine, 140);
    doc.text(splitAddress, textStartX, cursorY);
    cursorY += splitAddress.length * 4.5;
  }

  // ==========================================
  // "TAX INVOICE" label (top-right)
  // ==========================================

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("TAX INVOICE", pageWidth - margin, 20, { align: "right" });

  // ==========================================
  // Invoice meta row (Invoice No / Date / Due Date)
  // ==========================================

  const metaY = Math.max(cursorY, 40) + 10;

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.4);
  doc.line(margin, metaY - 6, pageWidth - margin, metaY - 6);

  const metaCols = [
    { label: "Invoice No.", value: invoice.invoiceNumber || "-" },
    {
      label: "Invoice Date",
      value: new Date(invoice.invoiceDate).toLocaleDateString("en-IN"),
    },
    {
      label: "Due Date",
      value: new Date(invoice.dueDate).toLocaleDateString("en-IN"),
    },
  ];

  const colWidth = (pageWidth - margin * 2) / metaCols.length;

  metaCols.forEach((col, i) => {
    const x = margin + colWidth * i;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text(col.label, x, metaY);

    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkText);
    doc.text(col.value, x, metaY + 6);
  });

  // ==========================================
  // Bill To
  // ==========================================

  const billToY = metaY + 20;

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkText);
  doc.text("Bill To", margin, billToY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(
    invoice.customer?.customerName || invoice.customer?.businessName || "-",
    margin,
    billToY + 7,
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grayText);

  let billLineY = billToY + 13;
  if (invoice.customer?.address) {
    doc.text(invoice.customer.address, margin, billLineY);
    billLineY += 5;
  }
  if (invoice.customer?.phone) {
    doc.text(`Mobile: ${invoice.customer.phone}`, margin, billLineY);
  }

  // ==========================================
  // Items Table
  // ==========================================

//   autoTable(doc, {
//     startY: billToY + 24,

//     head: [["No", "Items", "Qty", "Unit", "Rate", "Total"]],

//     body: invoice.items.map((item, index) => [
//       index + 1,
//       item.product?.productName || "-",
//       item.quantity,
//       item.unit || "Pcs",
//       Number(item.price).toLocaleString("en-IN", {
//         minimumFractionDigits: 2,
//       }),
//       Number(item.total).toLocaleString("en-IN", {
//         minimumFractionDigits: 2,
//       }),
//     ]),

//     theme: "plain",

//     styles: {
//       fontSize: 9.5,
//       cellPadding: { top: 3, bottom: 3, left: 2, right: 2 },
//       textColor: darkText,
//       lineColor: lineColor,
//     },

//     headStyles: {
//       fontStyle: "bold",
//       textColor: darkText,
//       fillColor: [255, 255, 255],
//       lineWidth: { bottom: 0.4 },
//       lineColor: primaryColor,
//     },

//     columnStyles: {
//       0: { cellWidth: 10, halign: "left" },
//       1: { cellWidth: "auto" },
//       2: { cellWidth: 15, halign: "center" },
//       3: { cellWidth: 15, halign: "center" },
//       4: { cellWidth: 25, halign: "right" },
//       5: { cellWidth: 28, halign: "right" },
//     },

//     didDrawPage: (data) => {
//       // bottom border under the last row of the table
//     },

//     margin: { left: margin, right: margin },
//   });

//   // Subtotal row directly under table
//   let finalY = doc.lastAutoTable.finalY;

//   doc.setDrawColor(...lineColor);
//   doc.line(margin, finalY, pageWidth - margin, finalY);
//   finalY += 7;

//   doc.setFontSize(9.5);
//   doc.setFont("helvetica", "bold");
//   doc.setTextColor(...darkText);
//   doc.text("SUBTOTAL", margin, finalY);
//   doc.text(
//     `${invoice.items.length}`,
//     margin + 90,
//     finalY,
//   );
//   doc.text(
//     `Rs. ${Number(invoice.subtotal).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//     })}`,
//     pageWidth - margin,
//     finalY,
//     { align: "right" },
//   );

// ==========================================
  // Items Table (with Subtotal row built into the table)
  // ==========================================

  autoTable(doc, {
    startY: billToY + 24,

    head: [["No", "Items", "Qty", "Unit", "Rate", "Total"]],

    body: invoice.items.map((item, index) => [
      index + 1,
      item.product?.productName || "-",
      item.quantity,
      item.unit || "Pcs",
      Number(item.price).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      }),
      Number(item.total).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      }),
    ]),

    // Subtotal row as part of the table itself -> columns auto-align
    foot: [
      [
        { content: "SUBTOTAL", colSpan: 2, styles: { halign: "left" } },
        {
          content: `${invoice.items.length}`,
          styles: { halign: "center" },
        },
        "",
        "",
        {
          content: `Rs. ${Number(invoice.subtotal).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}`,
          styles: { halign: "right" },
        },
      ],
    ],

    theme: "plain",

    styles: {
      fontSize: 9.5,
      cellPadding: { top: 3, bottom: 3, left: 2, right: 2 },
      textColor: darkText,
      lineColor: lineColor,
    },

    headStyles: {
      fontStyle: "bold",
      textColor: darkText,
      fillColor: [255, 255, 255],
      lineWidth: { bottom: 0.4 },
      lineColor: primaryColor,
    },

    footStyles: {
      fontStyle: "bold",
      textColor: darkText,
      fillColor: [255, 255, 255],
      fontSize: 9.5,
      lineWidth: { top: 0.4 },
      lineColor: lineColor,
    },

    columnStyles: {
      0: { cellWidth: 10, halign: "left" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 15, halign: "center" },
      3: { cellWidth: 15, halign: "center" },
      4: { cellWidth: 25, halign: "right" },
      5: { cellWidth: 28, halign: "right" },
    },

    margin: { left: margin, right: margin },
  });

  // finalY ab foot row ke baad ka Y hai (subtotal already table me draw ho chuka)
  let finalY = doc.lastAutoTable.finalY + 12;

  // ==========================================
  // Bank Details (left) + Totals breakdown (right)
  // ==========================================

  const summaryY = finalY + 16;
  const rightColX = pageWidth - margin - 65;

  // -- Left: Bank Details --
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("Bank Details", margin, summaryY);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);

  const bankRows = [
    ["Name", company?.bankName || "-"],
    ["IFSC", company?.ifscCode || "-"],
    ["Account No", company?.accountNumber || "-"],
    ["Bank Name", company?.bankName || "-"],
  ];

  let bankY = summaryY + 8;
  bankRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, bankY);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), margin + 28, bankY);
    bankY += 6;
  });

  if (company?.upiId) {
    doc.setFont("helvetica", "bold");
    doc.text("UPI ID:", margin, bankY + 4);
    doc.setFont("helvetica", "normal");
    doc.text(company.upiId, margin + 28, bankY + 4);
  }

  // -- Right: Charges breakdown --
  const gstHalf = Number(invoice.gstTotal) / 2; // split combined GST into CGST/SGST

  const summaryRows = [
    ["Service Charges", 0],
    ["Taxable Amount", Number(invoice.subtotal)],
    ["CGST @9%", gstHalf],
    ["SGST @9%", gstHalf],
  ];

  let rightY = summaryY;
  doc.setFontSize(9.5);

  summaryRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayText);
    doc.text(label, rightColX, rightY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(
      `Rs. ${value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      pageWidth - margin,
      rightY,
      { align: "right" },
    );
    rightY += 6.5;
  });

  doc.setDrawColor(...lineColor);
  doc.line(rightColX, rightY, pageWidth - margin, rightY);
  rightY += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...greenText);
  doc.text("Total Amount", rightColX, rightY);
  doc.text(
    `Rs. ${Number(invoice.grandTotal).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
    })}`,
    pageWidth - margin,
    rightY,
    { align: "right" },
  );

  // ==========================================
  // Total in words
  // ==========================================

  const wordsY = Math.max(bankY + 14, rightY + 14);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkText);
  doc.text("Total Amount (in words)", margin, wordsY);

  doc.setFont("helvetica", "italic");
  doc.setTextColor(...grayText);
  const wordsText = numberToWords(Number(invoice.grandTotal));
  const splitWords = doc.splitTextToSize(wordsText, pageWidth - margin * 2);
  doc.text(splitWords, margin, wordsY + 6);

  // ==========================================
  // Signature (bottom-right)
  // ==========================================

  const sigBoxX = pageWidth - margin - 55;
  const sigY = pageHeight - 45;

  if (company?.signature) {
    try {
      const signatureUrl = `http://localhost:5000/uploads/logos/${company.signature}`;
      doc.addImage(signatureUrl, "PNG", sigBoxX, sigY - 18, 45, 18);
    } catch (error) {
      console.log("Signature not loaded");
    }
  }

  doc.setDrawColor(...lineColor);
  doc.line(sigBoxX, sigY, sigBoxX + 45, sigY);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkText);
  doc.text("Signature", sigBoxX + 22.5, sigY + 5, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...grayText);
  doc.text(company?.companyName || "", sigBoxX + 22.5, sigY + 10, {
    align: "center",
  });

  // ==========================================
  // Footer
  // ==========================================

  doc.setDrawColor(...lineColor);
  doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...grayText);
  doc.text("Thank you for your business!", margin, pageHeight - 9);

  doc.setFont("helvetica", "normal");
  doc.text("Generated by InvoiceFlow", pageWidth - margin, pageHeight - 9, {
    align: "right",
  });

  // ==========================================
  // Save
  // ==========================================

  doc.save(`${invoice.invoiceNumber}.pdf`);
};

export default generateInvoicePDF;