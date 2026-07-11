import "../../styles/UpcomingDueInvoices.css";

function UpcomingDueInvoices({ invoices }) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="upcoming-due-card">
        <h3 className="upcoming-due-title">
          Upcoming Due Invoices
        </h3>

        <p className="upcoming-due-empty">
          No upcoming due invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="upcoming-due-card">
      <h3 className="upcoming-due-title">
        Upcoming Due Invoices
      </h3>

      <div className="upcoming-due-list">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="upcoming-due-item"
          >
            <div>
              <h4>{invoice.invoiceNumber}</h4>

              <p>
                {invoice.customer?.customerName ||
                  invoice.customer?.businessName}
              </p>

              <small>
                Due :
                {" "}
                {new Date(invoice.dueDate).toLocaleDateString(
                  "en-IN"
                )}
              </small>
            </div>

            <strong>
              ₹{invoice.grandTotal.toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingDueInvoices;