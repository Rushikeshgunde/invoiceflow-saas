import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Invoices.css";
import InvoicePDFButton from "./InvoicePDFButton";
// import generateInvoicePDF from "../../utils/generateInvoicePDF";
import { useNavigate } from "react-router-dom";

// ==========================================
// Invoice Row Component
// ==========================================

function InvoiceRow({ invoice, onView, onEdit, onDelete }) {
  const navigate = useNavigate();
  return (
    <tr>
      {/* Invoice Number */}
      <td>{invoice.invoiceNumber}</td>

      {/* Customer */}
      <td>
        {typeof invoice.customer === "object"
          ? invoice.customer?.customerName
          : invoice.customer}
      </td>

      {/* Invoice Date */}
      <td>{new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}</td>

      {/* Due Date */}
      <td>{new Date(invoice.dueDate).toLocaleDateString("en-IN")}</td>

      {/* Grand Total */}
      <td>₹{(invoice.grandTotal || 0).toLocaleString()}</td>

      {/* Payment Status */}
      <td>
        <span
          className={`invoice-status-badge ${invoice.paymentStatus
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {invoice.paymentStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="invoice-action-buttons">
        <button
          className="invoice-action-btn invoice-view-btn"
          title="View Invoice"
          onClick={() => navigate(`/dashboard/invoices/${invoice._id}`)}
        >
          <FaEye />
        </button>

        <button
          className="invoice-action-btn invoice-edit-btn"
          title="Edit"
          onClick={() => onEdit(invoice)}
        >
          <FaEdit />
        </button>

        <button
          className="invoice-action-btn invoice-delete-btn"
          title="Delete"
          onClick={() => onDelete(invoice._id)}
        >
          <FaTrash />
        </button>

        <InvoicePDFButton invoice={invoice} />
      </td>
    </tr>
  );
}

export default InvoiceRow;
