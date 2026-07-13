// ==========================================
// Imports
// ==========================================

import InvoiceSettings from "../components/settings/InvoiceSettings";
import TaxSettings from "../components/settings/TaxSettings";
import SecuritySettings from "../components/settings/SecuritySettings";

import "../styles/settingpage.css";

// ==========================================
// Settings Page
// ==========================================

function Settings() {
  return (
    <section className="settings-page">

      {/* ==========================================
          Header
      ========================================== */}

      <div className="settings-header">

        <h1>Settings</h1>

        <p>
          Manage your invoice, tax and security
          settings.
        </p>

      </div>

      {/* ==========================================
          Settings Grid (2 columns)
      ========================================== */}

      <div className="settings-grid">

        <InvoiceSettings />

        <TaxSettings />

        <SecuritySettings />

      </div>

    </section>
  );
}

export default Settings;