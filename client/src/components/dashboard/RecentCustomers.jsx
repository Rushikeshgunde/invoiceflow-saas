import "../../styles/RecentCustomers.css";

const customers = [
  {
    id: 1,
    name: "ABC Pvt Ltd",
    email: "abc@gmail.com",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "John Traders",
    email: "john@gmail.com",
    phone: "+91 9988776655",
  },
  {
    id: 3,
    name: "Tech Solutions",
    email: "tech@gmail.com",
    phone: "+91 9123456780",
  },
  {
    id: 4,
    name: "Royal Enterprises",
    email: "royal@gmail.com",
    phone: "+91 9012345678",
  },
];

function RecentCustomers() {
  return (
    <div className="recent-customers">
      <div className="section-header">
        <h3>Recent Customers</h3>

        <button>View All</button>
      </div>

      <div className="customer-list">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <div className="customer-avatar">{customer.name.charAt(0)}</div>

            <div className="customer-info">
              <h4>{customer.name}</h4>

              <p>{customer.email}</p>

              <span>{customer.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentCustomers;
