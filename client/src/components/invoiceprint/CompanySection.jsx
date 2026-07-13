// ==========================================
// Company Section
// ==========================================

function CompanySection({ invoice }) {
  return (
    <div className="company-section">
      <div className="company-details">
        <h2>InvoiceFlow Technologies Pvt. Ltd.</h2>

        <p>Pune, Maharashtra</p>

        <p>GSTIN : 27ABCDE1234F1Z5</p>

        <p>PAN : ABCDE1234F</p>

        <p>Email : support@invoiceflow.com</p>

        <p>Phone : +91 9876543210</p>
      </div>

      <div className="invoice-basic-info">
        <table>
          <tbody>
            <tr>
              <td>Invoice No</td>
              <td>{invoice.invoiceNumber}</td>
            </tr>

            <tr>
              <td>Invoice Date</td>
              <td>
                {new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}
              </td>
            </tr>

            <tr>
              <td>Due Date</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString("en-IN")}</td>
            </tr>

            <tr>
              <td>Status</td>
              <td>{invoice.paymentStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanySection;
