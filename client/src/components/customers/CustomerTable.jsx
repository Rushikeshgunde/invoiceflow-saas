import CustomerRow from "./CustomerRow";

function CustomerTable({ customers,onEdit,onDelete,onView }) {
  return (
    <div className="customer-table-wrapper">
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>GST</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer._id}
                customer={customer}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;