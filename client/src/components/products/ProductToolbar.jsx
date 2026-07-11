import { FaPlus, FaSearch } from "react-icons/fa";

import "../../styles/Products.css";

function ProductToolbar({
  search,
  setSearch,
  category,
  setCategory,
  stockFilter,
  setStockFilter,
  onAddProduct,
}) {
  return (
    <div className="product-toolbar">
      <div className="toolbar-left">
        {/* Search */}
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="toolbar-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
          <option value="Clothing">Clothing</option>
        </select>

        {/* Stock Filter */}
        <select
          className="toolbar-select"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <button
        className="add-btn"
        onClick={onAddProduct}
      >
        <FaPlus />
        Add Product
      </button>
    </div>
  );
}

export default ProductToolbar;