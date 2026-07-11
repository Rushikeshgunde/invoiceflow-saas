import ProductRow from "./ProductRow";

function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Purchase</th>
            <th>Selling</th>
            <th>GST</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
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

export default ProductTable;