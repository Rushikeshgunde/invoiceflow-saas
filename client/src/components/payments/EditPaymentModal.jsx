// ==========================================
// Imports
// ==========================================

import PaymentForm from "./PaymentForm";

import "../../styles/Payments.css";

// ==========================================
// Edit Payment Modal
// ==========================================

function EditPaymentModal({
  open,
  onClose,
  payment,
  invoices,
}) {
  if (!open || !payment) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-form-modal">

        {/* ==========================================
            Header
        ========================================== */}

        <div className="payment-modal-header">
          <h2>Edit Payment</h2>

          <button
            className="payment-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* ==========================================
            Payment Form
        ========================================== */}

        <PaymentForm
          payment={payment}
          invoices={invoices}
          onClose={onClose}
          isEdit={true}
        />

      </div>
    </div>
  );
}

export default EditPaymentModal;