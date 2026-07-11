// ==========================================
// Imports
// ==========================================

import InvoiceForm from "./InvoiceForm";

import "../../styles/Invoices.css";

// ==========================================
// Add / Edit Invoice Modal
// ==========================================

function AddInvoiceModal({ open, onClose, invoice, onAdd, onUpdate }) {
  if (!open) return null;

  return (
    <div className="invoice-modal-overlay">
      <div className="invoice-modal">
        {/* ==========================================
            Modal Header
        ========================================== */}

        <div className="invoice-modal-header">
          <h2>Add Invoice</h2>

          <button className="invoice-modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ==========================================
            Invoice Form
        ========================================== */}

        <InvoiceForm
          invoice={invoice}
          onClose={onClose}
          onAdd={onAdd}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
}

export default AddInvoiceModal;
