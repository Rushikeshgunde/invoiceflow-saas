import LoginForm from "../components/auth/LoginForm";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-left">

          <h1>InvoiceFlow</h1>

          <p>
            Manage GST Billing, Customers,
            Inventory and Reports from one place.
          </p>

          <ul>

            <li>✅ GST Billing</li>

            <li>✅ Invoice Management</li>

            <li>✅ Customer Management</li>

            <li>✅ Reports & Analytics</li>

          </ul>

        </div>

        <div className="login-right">

          <LoginForm />

        </div>

      </div>

    </div>
  );
}

export default Login;