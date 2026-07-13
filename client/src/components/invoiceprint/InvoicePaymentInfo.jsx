// ==========================================
// Payment Information
// ==========================================
import "../../styles/invoiceprint.css"

function InvoicePaymentInfo({ invoice }) {
  return (
    <div className="payment-info">

      <h3>Payment Information</h3>

      <table>

        <tbody>

          <tr>
            <td>Status</td>
            <td>{invoice.paymentStatus}</td>
          </tr>

          <tr>
            <td>Invoice Date</td>
            <td>
              {new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}
            </td>
          </tr>

          <tr>
            <td>Due Date</td>
            <td>
              {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default InvoicePaymentInfo;