// ==========================================
// Imports
// ==========================================

import { FaPlus, FaTrash } from "react-icons/fa";

import "../../styles/Invoices.css";

// ==========================================
// Invoice Items Table
// ==========================================
function InvoiceItemsTable({
  items,
  products,
  onAddItem,
  onDeleteItem,
  onItemChange,
}) {
  return (
    <div className="invoice-items-wrapper">
      <button
        type="button"
        onClick={onAddItem}
        className="invoice-add-item-btn"
      >
        <FaPlus />
        Add Item
      </button>
      {/* ----------------------------------------------------------------------------- */}
      <table className="invoice-items-table">
        <thead>
          <tr>
            <th>Product</th>

            <th>SKU</th>

            <th>Qty</th>

            <th>Price</th>

            <th>Discount %</th>

            <th>GST %</th>

            <th>Total</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <select
                  className="invoice-table-input"
                  value={item.product?._id || item.product || ""}
                  onChange={(e) =>
                    onItemChange(item.id, "product", e.target.value)
                  }
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  readOnly
                  className="invoice-table-input"
                  value={item.sku}
                />
              </td>

              <td>
                <input
                  type="number"
                  className="invoice-table-input"
                  onWheel={(e) => e.target.blur()}
                  value={item.quantity}
                  onChange={(e) =>
                    onItemChange(item.id, "quantity", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  className="invoice-table-input"
                  onWheel={(e) => e.target.blur()}
                  value={item.price}
                  onChange={(e) =>
                    onItemChange(item.id, "price", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  className="invoice-table-input"
                  onWheel={(e) => e.target.blur()}
                  value={item.discount}
                  onChange={(e) =>
                    onItemChange(item.id, "discount", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  className="invoice-table-input"
                  onWheel={(e) => e.target.blur()}
                  value={item.gst}
                  onChange={(e) =>
                    onItemChange(item.id, "gst", Number(e.target.value))
                  }
                />
              </td>

              <td>₹{item.total}</td>

              <td>
                <button
                  type="button"
                  className="invoice-table-delete-btn"
                  onClick={() => onDeleteItem(item.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ==========================================
          Add Item Button
      ========================================== */}
    </div>
  );
}

export default InvoiceItemsTable;
