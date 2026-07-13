// ==========================================
// Customer Section
// ==========================================
import "../../styles/invoiceprint.css"

function CustomerSection({ invoice }) {
  const customer = invoice.customer || {};

  return (
    <div className="customer-section">
      <div className="bill-to">
        <h3>Bill To</h3>

        <h2>{customer.customerName || customer.businessName}</h2>

        <p>
          <strong>Business :</strong> {customer.businessName || "-"}
        </p>

        <p>
          <strong>GST :</strong> {customer.gstNumber || "-"}
        </p>

        <p>
          <strong>Phone :</strong> {customer.phone || "-"}
        </p>

        <p>
          <strong>Email :</strong> {customer.email || "-"}
        </p>

        <p>
          <strong>Address :</strong> {customer.address || "-"}
        </p>
      </div>
    </div>
  );
}

export default CustomerSection;
