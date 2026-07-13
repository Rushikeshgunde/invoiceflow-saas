// ==========================================
// Imports
// ==========================================
import "../../styles/payments.css";

import {
  FaMoneyBillWave,
  FaCalendarDay,
  FaFileInvoiceDollar,
  FaCheckCircle,
} from "react-icons/fa";

// ==========================================
// Payment Summary
// ==========================================

function PaymentSummary({ payments }) {
  // ==========================================
  // Total Amount Received
  // ==========================================

  const totalReceived = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );

  // ==========================================
  // Today's Collection
  // ==========================================

  const today = new Date().toDateString();

  const todayCollection = payments
    .filter((payment) => new Date(payment.paymentDate).toDateString() === today)
    .reduce((sum, payment) => sum + payment.amount, 0);

  // ==========================================
  // Total Payments
  // ==========================================

  const totalPayments = payments.length;

  // ==========================================
  // Paid Invoices
  // ==========================================

  const paidInvoices = new Set(
    payments
      .filter((payment) => payment.invoice?.paymentStatus === "Paid")
      .map((payment) => payment.invoice?._id),
  ).size;

  // ==========================================
  // Cards
  // ==========================================

  const cards = [
    {
      title: "Total Received",
      value: `₹${totalReceived.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Today's Collection",
      value: `₹${todayCollection.toLocaleString()}`,
      icon: <FaCalendarDay />,
    },
    {
      title: "Payments",
      value: totalPayments,
      icon: <FaFileInvoiceDollar />,
    },
    {
      title: "Paid Invoices",
      value: paidInvoices,
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <div className="payment-summary">
      {cards.map((card) => (
        <div key={card.title} className="payment-summary-card">
          <div className="payment-summary-icon">{card.icon}</div>

          <div className="payment-summary-content">
            <h5>{card.title}</h5>

            <h3>{card.value}</h3> 
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentSummary;
