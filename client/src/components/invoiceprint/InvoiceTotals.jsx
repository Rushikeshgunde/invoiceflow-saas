// ==========================================
// Invoice Totals
// ==========================================
import "../../styles/invoiceprint.css"

function InvoiceTotals({ invoice }) {
  return (
    <div className="invoice-totals">
      <table>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>₹{Number(invoice.subtotal || 0).toLocaleString("en-IN")}</td>
          </tr>

          <tr>
            <td>GST</td>
            <td>₹{Number(invoice.gstTotal || 0).toLocaleString("en-IN")}</td>
          </tr>

          <tr className="invoice-grand-total">
            <td>Grand Total</td>
            <td>₹{Number(invoice.grandTotal || 0).toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceTotals;
