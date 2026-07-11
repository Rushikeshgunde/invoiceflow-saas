// ==========================================
// Imports
// ==========================================

import { useEffect } from "react";

import "../../styles/Expenses.css";

// ==========================================
// Expense View Modal Component
// ==========================================

function ExpenseViewModal({ expense, onClose }) {
  // ==========================================
  // Close if no expense selected
  // ==========================================

  if (!expense) return null;

  // ==========================================
  // Prevent Body Scroll
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ==========================================
  // Close on ESC
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className="expense-modal-overlay"
      onClick={onClose}
    >
      <div
        className="expense-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= Header ================= */}

        <div className="expense-modal-header">
          <div>
            <h2>Expense Details</h2>

            <p className="expense-modal-subtitle">
              {expense.category || "General"}
            </p>
          </div>

          <button
            className="expense-modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* ================= Body ================= */}

        <div className="expense-modal-body">

          <div className="expense-modal-row">
            <strong>Title</strong>

            <span>{expense.title}</span>
          </div>

          <div className="expense-modal-row">
            <strong>Vendor</strong>

            <span>
              {expense.vendor || "N/A"}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Amount</strong>

            <span className="expense-modal-amount">
              ₹
              {Number(
                expense.amount || 0
              ).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Status</strong>

            <span
              className={`expense-status-badge ${expense.status
                ?.toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {expense.status}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Date</strong>

            <span>
              {new Date(
                expense.expenseDate
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Payment Method</strong>

            <span>
              {expense.paymentMethod || "N/A"}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Reference No.</strong>

            <span>
              {expense.referenceNumber || "N/A"}
            </span>
          </div>

          <div className="expense-modal-row">
            <strong>Notes</strong>

            <span className="expense-modal-notes">
              {expense.notes || "No notes available."}
            </span>
          </div>

        </div>

        {/* ================= Footer ================= */}

        <div className="expense-modal-footer">
          <button
            className="expense-close-btn"
            onClick={onClose}
          >
            ✖ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseViewModal;