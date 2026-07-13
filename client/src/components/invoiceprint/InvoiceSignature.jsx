// ==========================================
// Signature Section
// ==========================================
import "../../styles/invoiceprint.css";

function InvoiceSignature() {
  return (
    <div className="invoice-signature-section">
      <div className="invoice-bank-details">
        <h3>Bank Details</h3>

        <p>
          <strong>Bank :</strong> HDFC Bank
        </p>

        <p>
          <strong>A/C No :</strong> 123456789012
        </p>

        <p>
          <strong>IFSC :</strong> HDFC0001234
        </p>

        <p>
          <strong>UPI :</strong> invoiceflow@upi
        </p>
      </div>

      <div className="invoice-signature">
        <p>For</p>

        <h3>InvoiceFlow Technologies Pvt. Ltd.</h3>

        <div className="signature-space"></div>

        <p>Authorized Signatory</p>
      </div>
    </div>
  );
}

export default InvoiceSignature;
