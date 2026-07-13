// ==========================================
// Imports
// ==========================================

import { FaPrint, FaDownload, FaEnvelope, FaShareAlt } from "react-icons/fa";
import "../../styles/invoiceprint.css"
// ==========================================
// Invoice Actions
// ==========================================

function InvoiceActions({ onPrint, onDownload, onEmail, onShare }) {
  return (
    <div className="invoice-actions">
      <button className="invoice-action-btn" onClick={onPrint}>
        <FaPrint />
        Print
      </button>

      <button className="invoice-action-btn" onClick={onDownload}>
        <FaDownload />
        Download PDF
      </button>

      <button className="invoice-action-btn" onClick={onEmail}>
        <FaEnvelope />
        Email
      </button>

      <button className="invoice-action-btn" onClick={onShare}>
        <FaShareAlt />
        Share
      </button>
    </div>
  );
}

export default InvoiceActions;
