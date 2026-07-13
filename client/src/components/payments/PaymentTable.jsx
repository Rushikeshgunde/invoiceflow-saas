import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Payments.css";


function PaymentTable({ payments, loading, onView, onEdit, onDelete }) {
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return <div className="payment-table-loading">Loading payments...</div>;
  }

  // ==========================================
  // Empty State
  // ==========================================

  if (!payments.length) {
    return <div className="payment-table-empty">No payments found.</div>;
  }

  return (
    <div className="payment-table-wrapper">
      <table className="payment-table">
        <thead>
          <tr>
            <th>Invoice</th>

            <th>Customer</th>

            <th>Amount</th>

            <th>Method</th>

            <th>Date</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.invoice?.invoiceNumber || "-"}</td>

              <td>
                {payment.customer?.customerName ||
                  payment.customer?.businessName ||
                  "-"}
              </td>

              <td>
                {/* FIX: matched PaymentModal's formatting
                    (2 decimal places) so amounts look consistent
                    across the app. */}
                ₹
                {Number(payment.amount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </td>

              <td>{payment.paymentMethod || "-"}</td>

              <td>
                {/* FIX: guarded against missing/invalid paymentDate,
                    which previously rendered "Invalid Date". */}
                {payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleDateString("en-IN")
                  : "-"}
              </td>

              <td>
                <span
                  className={`payment-status ${
                    payment.invoice?.paymentStatus
                      ?.toLowerCase()
                      .replace(/\s+/g, "-") || ""
                  }`}
                >
                  {payment.invoice?.paymentStatus || "-"}
                </span>
              </td>

              <td>
                <div className="payment-actions">
                  <button
                    className="payment-view-btn"
                    onClick={() => onView(payment)}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="payment-edit-btn"
                    onClick={() => onEdit(payment)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="payment-delete-btn"
                    onClick={() => onDelete(payment)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
