import "../../styles/Invoices.css";
import InvoicePDFButton from "./InvoicePDFButton";
// ==========================================
// View Invoice Modal
// ==========================================

function ViewInvoiceModal({ open, onClose, invoice }) {
  if (!open || !invoice) return null;

  // ==========================================
  // Customer Name
  // ==========================================

  const customerName =
    invoice.customer?.customerName ||
    invoice.customer?.businessName ||
    invoice.customer?.fullName ||
    invoice.customer?.name ||
    invoice.customer ||
    "Unknown Customer";

  // ==========================================
  // Status Badge Class
  // ==========================================

  const badgeClass = (invoice.paymentStatus || "Unpaid")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div className="invoice-view-modal-overlay">
      <div className="invoice-view-modal">
        {/* Header */}

        <div className="invoice-view-modal-header">
          <div className="invoice-view-identity">
            <div className="invoice-avatar">
              {customerName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{invoice.invoiceNumber}</h2>
              <p>{customerName}</p>
            </div>
          </div>

          <button className="invoice-view-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="invoice-view-modal-body">
          <span className={`invoice-status-badge ${badgeClass}`}>
            {invoice.paymentStatus}
          </span>

          {/* Invoice Details */}

          <div className="invoice-view-section">
            <h4>Invoice Details</h4>

            <div className="invoice-view-grid">
              <div className="invoice-view-field">
                <span className="invoice-view-label">Invoice Date</span>

                <span className="invoice-view-value">
                  {new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}
                </span>
              </div>

              <div className="invoice-view-field">
                <span className="invoice-view-label">Due Date</span>

                <span className="invoice-view-value">
                  {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}

          <div className="invoice-view-section">
            <h4>Items</h4>

            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>GST</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product?.productName || "-"}</td>
                    <td>{item.sku}</td>
                    <td>{item.quantity}</td>
                    <td>₹{Number(item.price).toLocaleString()}</td>
                    <td>{item.discount}%</td>
                    <td>{item.gst}%</td>
                    <td>₹{Number(item.total).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}

          <div className="invoice-summary-card">
            <div className="invoice-summary-row">
              <span>Subtotal</span>
              <strong>₹{Number(invoice.subtotal || 0).toLocaleString()}</strong>
            </div>

            <div className="invoice-summary-row">
              <span>GST</span>
              <strong>₹{Number(invoice.gstTotal || 0).toLocaleString()}</strong>
            </div>

            <div className="invoice-summary-row invoice-summary-total">
              <span>Total Amount</span>
              <strong>
                ₹{Number(invoice.grandTotal || 0).toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="invoice-view-actions">
            <InvoicePDFButton invoice={invoice} />
          </div>

          {/* Notes */}

          {invoice.notes && (
            <div className="invoice-view-section">
              <h4>Notes</h4>
              <p className="invoice-view-notes">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewInvoiceModal;
