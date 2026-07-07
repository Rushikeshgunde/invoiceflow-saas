import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          InvoiceFlow
        </Link>

        <div className="ms-auto">
          <Link to="/login" className="btn btn-light me-2">
            Login
          </Link>

          <Link to="/register" className="btn btn-warning">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
