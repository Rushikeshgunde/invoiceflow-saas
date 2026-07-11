import { useEffect, useMemo, useState } from "react";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductTable from "../components/products/ProductTable";
import ProductPagination from "../components/products/ProductPagination";
import AddProductModal from "../components/products/AddProductModal";

import { getProducts, deleteProduct } from "../services/productService";

import "../styles/Products.css";

function Products() {

  const [products, setProducts] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);

  // filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

 

  // ---------------------load product------------------------------------
  const loadProducts = async () => {
  try {
    setLoading(true);

    const res = await getProducts();

    setProducts(res.products);

    setError("");
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Failed to load products."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadProducts();
}, []);

// ---------------------------------------------------------------

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    await deleteProduct(id);

    loadProducts();
  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Delete failed"
    );
  }
};

  // ==========================
  // Pagination
  // ==========================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const stockStatus =
      product.stock === 0
        ? "Out of Stock"
        : product.stock <= product.lowStock
        ? "Low Stock"
        : "In Stock";

    const matchesSearch =
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.sku
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    const matchesStock =
      stockFilter === "All" ||
      stockStatus === stockFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStock
    );
  });
}, [products, search, category, stockFilter]);



  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, stockFilter]);

  if (loading) {
  return (
    <section className="products-page">
      <h2>Loading Products...</h2>
    </section>
  );
}

if (error) {
  return (
    <section className="products-page">
      <h2>{error}</h2>
    </section>
  );
}



  return (
    <section className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <p>Manage your products</p>
      </div>

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        onAddProduct={() => {
          setSelectedProduct(null);
          setOpenModal(true);
        }}
      />

      <ProductTable
        products={currentProducts}
        onView={(product) => {
          setViewProduct(product);
          setOpenViewModal(true);
        }}
        onEdit={(product) => {
          //  console.log(product);
          setSelectedProduct(product);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {filteredProducts.length > 0 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <AddProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        refreshProducts={loadProducts}
        product={selectedProduct}
      />

      {/* CHANGE: replaced the flat <p><strong> list (which reused the
          generic customer-modal-* classes) with the dedicated
          product-view-modal-* structure — sticky header with avatar,
          status badge, and grouped sections (Pricing / Inventory) in a
          grid layout. This matches the design pattern already built for
          ViewInvoiceModal, instead of two different visual styles for
          "view details" across the app. */}
      {openViewModal && viewProduct && (
        <div className="product-view-modal-overlay">
          <div className="product-view-modal">
            <div className="product-view-modal-header">
              <div className="product-view-identity">
                <div className="product-avatar">
                  {viewProduct.productName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{viewProduct.productName}</h2>
                  <p>SKU: {viewProduct.sku}</p>
                </div>
              </div>

              <button
                className="product-view-close-btn"
                onClick={() => setOpenViewModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="product-view-modal-body">
              <span
                className={`product-status-badge ${
                  viewProduct.status === "Active" ? "active" : "inactive"
                }`}
              >
                {viewProduct.status}
              </span>

              <div className="product-view-section">
                <h4>Pricing</h4>
                <div className="product-view-grid">
                  <div className="product-view-field">
                    <span className="product-view-label">Purchase Price</span>
                    <span className="product-view-value">
                      ₹{viewProduct.purchasePrice}
                    </span>
                  </div>

                  <div className="product-view-field">
                    <span className="product-view-label">Selling Price</span>
                    <span className="product-view-value">
                      ₹{viewProduct.sellingPrice}
                    </span>
                  </div>

                  <div className="product-view-field">
                    <span className="product-view-label">GST</span>
                    <span className="product-view-value">
                      {viewProduct.gst}%
                    </span>
                  </div>

                  <div className="product-view-field">
                    <span className="product-view-label">Category</span>
                    <span className="product-view-value">
                      {viewProduct.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-view-section">
                <h4>Inventory</h4>
                <div className="product-view-grid">
                  <div className="product-view-field">
                    <span className="product-view-label">Stock</span>
                    <span className="product-view-value">
                      {viewProduct.stock}
                    </span>
                  </div>

                  <div className="product-view-field">
                    <span className="product-view-label">Low Stock Alert</span>
                    <span className="product-view-value">
                      {viewProduct.lowStock}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
// -----------------------------------------------------------------------------------