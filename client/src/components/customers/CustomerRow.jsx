import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/customers.css";

function CustomerRow({ customer, onEdit,onView, onDelete }) {
  return (
    <tr>
      <td>{customer.customerName}</td>

      <td>{customer.email || "-"}</td>

      <td>{customer.phone}</td>

      <td>{customer.gstNumber || "-"}</td>

      <td>
        <span
          className={
            customer.status === "Active" ? "status active" : "status inactive"
          }
        >
          {customer.status}
        </span>
      </td>

      <td className="action-buttons">
        <button className="action-btn view" title="View" onClick={() => onView(customer)}>
          <FaEye />
        </button>

        <button
          className="action-btn edit"
          title="Edit"
          onClick={() => onEdit(customer)}
        >
          <FaEdit />
        </button>

        <button
          className="action-btn delete"
          title="Delete"
          onClick={() => onDelete(customer._id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default CustomerRow;
