import "../../styles/LowStockProducts.css";

function LowStockProducts({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="low-stock-card">
        <h3 className="low-stock-title">Low Stock Products</h3>

        <p className="low-stock-empty">
          🎉 No low stock products found.
        </p>
      </div>
    );
  }

  return (
    <div className="low-stock-card">
      <div className="low-stock-header">
        <h3 className="low-stock-title">Low Stock Products</h3>
      </div>

      <div className="low-stock-list">
        {products.map((product) => (
          <div
            key={product._id}
            className="low-stock-item"
          >
            <div className="low-stock-info">
              <h4 className="low-stock-name">
                {product.productName}
              </h4>

              <p className="low-stock-sku">
                SKU : {product.sku}
              </p>
            </div>

            <div className="low-stock-right">
              <span className="low-stock-badge">
                Stock : {product.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LowStockProducts;