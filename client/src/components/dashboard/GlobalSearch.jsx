import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../styles/GlobalSearch.css";

const searchData = [
  {
    id: 1,
    type: "Customer",
    name: "John Traders",
    path: "/dashboard/customers",
  },
  {
    id: 2,
    type: "Customer",
    name: "ABC Pvt Ltd",
    path: "/dashboard/customers",
  },
  {
    id: 3,
    type: "Invoice",
    name: "INV-101",
    path: "/dashboard/invoices",
  },
  {
    id: 4,
    type: "Invoice",
    name: "INV-102",
    path: "/dashboard/invoices",
  },
  {
    id: 5,
    type: "Product",
    name: "Laptop",
    path: "/dashboard/products",
  },
  {
    id: 6,
    type: "Product",
    name: "Printer",
    path: "/dashboard/products",
  },
];

function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const handleSelect = (item) => {
  console.log(item);
  closeSearch();
  navigate(item.path);
};

  // Open Search
  const openSearch = () => {
    setOpen(true);
  };

  // Close Search
  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  // Auto Focus
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }

      if (e.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = searchData.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="global-search" ref={searchRef}>
      <button className="search-button" onClick={() => setOpen(openSearch)}>
        <FaSearch />

        <span>Search...</span>
        <kbd>Ctrl + K</kbd>
      </button>

      {open && (
        <div className="search-modal">
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="search-results">
            {filtered.length === 0 ? (
              <p>No Results Found</p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="search-item"
                  onClick={() => handleSelect(item)}
                >
                  <span>{item.type}</span>

                  <h4>{item.name}</h4>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
