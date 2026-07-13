// ==========================================
// Items Table
// ==========================================
import "../../styles/invoiceprint.css"

function InvoiceItemsTable({ invoice }) {
  return (
    <table className="invoice-items-table">

      <thead>

        <tr>

          <th>#</th>

          <th>Product</th>

          <th>SKU</th>

          <th>Qty</th>

          <th>Price</th>

          <th>GST %</th>

          <th>Discount</th>

          <th>Total</th>

        </tr>

      </thead>

      <tbody>

        {invoice.items.map((item, index) => (

          <tr key={index}>

            <td>{index + 1}</td>

            <td>
              {item.product?.productName || "-"}
            </td>

            <td>{item.sku}</td>

            <td>{item.quantity}</td>

            <td>
              ₹{item.price.toLocaleString()}
            </td>

            <td>{item.gst}%</td>

            <td>
              ₹{item.discount.toLocaleString()}
            </td>

            <td>
              ₹{item.total.toLocaleString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default InvoiceItemsTable;