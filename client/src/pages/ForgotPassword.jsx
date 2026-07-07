import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

import "../styles/ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="forgot-left">
          <h1>InvoiceFlow</h1>

          <p>
            Forgot your password? No worries. We'll send you a secure reset
            link.
          </p>

          <div className="features">
            <div>🔒 Secure Reset</div>

            <div>📧 Email Verification</div>

            <div>⚡ 15 Minute Expiry</div>
          </div>
        </div>

        <div className="forgot-right">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
