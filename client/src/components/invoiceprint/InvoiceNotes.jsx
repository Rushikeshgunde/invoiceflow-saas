// ==========================================
// Invoice Notes
// ==========================================
import "../../styles/invoiceprint.css"

function InvoiceNotes({ invoice }) {
  return (
    <div className="invoice-notes">

      <h3>Notes</h3>

      <p>
        {invoice.notes || "No additional notes."}
      </p>

      <h3>Terms & Conditions</h3>

      <ul>

        <li>Goods once sold will not be taken back.</li>

        <li>Please pay before the due date.</li>

        <li>Subject to Pune jurisdiction.</li>

      </ul>

    </div>
  );
}

export default InvoiceNotes;