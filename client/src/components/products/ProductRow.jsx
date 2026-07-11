import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "../../styles/Products.css"

function ProductRow({
  product,
  onView,
  onEdit,
  onDelete,
}) {
  const stockStatus =
    product.stock === 0
      ? "Out of Stock"
      : product.stock <= product.lowStock
      ? "Low Stock"
      : "In Stock";

  return (
    <tr>
      <td>{product.productName}</td>
      <td>{product.sku}</td>
      <td>{product.category}</td>
      <td>{product.stock}</td>

      <td>
        <span
          className={`stock-status ${stockStatus
            .toLowerCase()
            .replace(/\s/g, "-")}`}
        >
          {stockStatus}
        </span>
      </td>

      <td>₹{product.purchasePrice}</td>
      <td>₹{product.sellingPrice}</td>
      <td>{product.gst}%</td>

      <td className="action-buttons">
        <button
          className="action-btn view"
          title="View"
          onClick={() => onView(product)}
        >
          <FaEye />
        </button>

        <button
          className="action-btn edit"
          title="Edit"
          onClick={() => onEdit(product)}
        >
          <FaEdit />
        </button>

        <button
          className="action-btn delete"
          title="Delete"
          onClick={() => onDelete(product._id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;