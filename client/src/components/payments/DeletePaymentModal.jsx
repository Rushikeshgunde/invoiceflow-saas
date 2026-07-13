// ==========================================
// Imports
// ==========================================

import { FaTrashAlt, FaTimes } from "react-icons/fa";

import "../../styles/Payments.css";

// ==========================================
// Delete Payment Modal
// ==========================================

function DeletePaymentModal({open, payment, loading, onClose, onDelete }) {
  if (!open || !payment) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="delete-payment-modal">
        {/* ========================================== */}
        {/* Header */}
        {/* ========================================== */}

        <div className="payment-modal-header">
          <h2>Delete Payment</h2>

          <button
            className="payment-modal-close"
            onClick={onClose}
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        {/* ========================================== */}
        {/* Body */}
        {/* ========================================== */}

        <div className="delete-payment-body">
          <div className="delete-payment-icon">
            <FaTrashAlt />
          </div>

          <h3>Delete this payment?</h3>

          <p>
            You are about to permanently delete this payment. This action cannot
            be undone.
          </p>

          <div className="delete-payment-summary">
            <div className="payment-summary-item">
              <span>Invoice</span>

              <strong>{payment.invoice?.invoiceNumber || "-"}</strong>
            </div>

            <div className="payment-summary-item">
              {/* FIX: matched the 2-decimal formatting used elsewhere
                  (PaymentModal / PaymentTable) for consistency. */}
              <span>Amount</span>

              <strong>
                ₹
                {Number(payment.amount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="payment-summary-item">
              <span>Method</span>

              <strong>{payment.paymentMethod || "-"}</strong>
            </div>

            <div className="payment-summary-item">
              <span>Date</span>

              {/* FIX: guarded against missing/invalid paymentDate,
                  which previously rendered "Invalid Date". */}
              <strong>
                {payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleDateString(
                      "en-IN"
                    )
                  : "-"}
              </strong>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* Footer */}
        {/* ========================================== */}

        <div className="payment-modal-footer">
          <button
            className="payment-cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          {/* FIX: renamed from "payment-delete-btn" — that class
              is already used in PaymentTable.css for the small
              icon-only delete button in table rows, and its
              :hover rule would have leaked onto this button too. */}
          <button
            className="payment-delete-confirm-btn"
            onClick={() => onDelete(payment._id)}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePaymentModal;