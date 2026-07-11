import "../../styles/RecentInvoices.css";

function RecentInvoices({ invoices }) {
  if (!invoices.length) {
    return (
      <div className="recent-invoices-card">
        <h3 className="recent-invoices-title">Recent Invoices</h3>

        <p className="recent-invoices-empty">No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="recent-invoices-card">
      <h3 className="recent-invoices-title">Recent Invoices</h3>

      {invoices.map((invoice) => (
        <div key={invoice._id} className="recent-invoices-item">
          <div className="recent-invoices-info">
            <h4 className="recent-invoices-number">{invoice.invoiceNumber}</h4>

            <p className="recent-invoices-customer">
              {invoice.customer?.customerName || invoice.customer?.businessName}
            </p>
          </div>

          <div className="recent-invoices-right">
            <span
              className={`recent-invoices-status ${(
                invoice.paymentStatus || "Unpaid"
              )
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {invoice.paymentStatus || "Unpaid"}
            </span>

            <strong className="recent-invoices-amount">
              ₹{Number(invoice.grandTotal).toLocaleString()}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentInvoices;
