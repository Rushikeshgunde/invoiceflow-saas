import "../../styles/RecentCustomers.css";

function RecentCustomers({ customers }) {
  if (!customers.length) {
    return (
      <div className="recent-customers">
        <div className="section-header">
          <h3>Recent Customers</h3>
        </div>

        <p>No customers found.</p>
      </div>
    );
  }

  return (
    <div className="recent-customers">
      <div className="section-header">
        <h3>Recent Customers</h3>

        <button>View All</button>
      </div>

      <div className="customer-list">
        {customers.map((customer) => (
          <div key={customer._id} className="customer-card">
            <div className="customer-avatar">
              {(customer.customerName || customer.businessName || "?")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="customer-info">
              <h4>
                {customer.customerName || customer.businessName}
              </h4>

              <p>{customer.email}</p>

              <span>{customer.mobileNo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCustomers;