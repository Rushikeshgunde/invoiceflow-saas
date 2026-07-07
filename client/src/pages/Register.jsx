import RegisterForm from "../components/auth/RegisterForm";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-page">
      <div className="register-container">

        <div className="left-section">

          <div className="brand">

            <h1>InvoiceFlow</h1>

            <p>
              Smart GST Billing & Invoice Management Software
            </p>

          </div>

          <div className="features">

            <div className="feature">
              ✅ GST Billing
            </div>

            <div className="feature">
              ✅ Customer Management
            </div>

            <div className="feature">
              ✅ Business Reports
            </div>

            <div className="feature">
              ✅ Cloud Backup
            </div>

            <div className="feature">
              ✅ Secure & Fast
            </div>

          </div>

        </div>

        <div className="right-section">

          <RegisterForm />

        </div>

      </div>
    </div>
  );
}

export default Register;