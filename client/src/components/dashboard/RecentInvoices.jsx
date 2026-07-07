import "../../styles/RecentInvoices.css";

const invoices = [
  {
    id: "INV-101",
    customer: "ABC Pvt Ltd",
    amount: "₹5,500",
    status: "Paid",
    date: "06 Jul 2026",
  },
  {
    id: "INV-102",
    customer: "John Traders",
    amount: "₹2,300",
    status: "Pending",
    date: "05 Jul 2026",
  },
  {
    id: "INV-103",
    customer: "Rahul Agency",
    amount: "₹9,000",
    status: "Overdue",
    date: "04 Jul 2026",
  },
  {
    id: "INV-104",
    customer: "Tech Solutions",
    amount: "₹7,200",
    status: "Paid",
    date: "03 Jul 2026",
  },
];

function RecentInvoices() {
  return (
    <div className="recent-card">
      <div className="recent-header">
        <h3>Recent Invoices</h3>

        <button>View All</button>
      </div>

      <table className="recent-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>

              <td>{invoice.customer}</td>

              <td>{invoice.amount}</td>

              <td>
                <span className={`status ${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </span>
              </td>

              <td>{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentInvoices;
