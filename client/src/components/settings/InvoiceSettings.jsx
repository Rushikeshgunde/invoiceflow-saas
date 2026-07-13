// ==========================================
// Imports
// ==========================================

import { useEffect, useState } from "react";

import { useSetting } from "../../context/SettingContext";
import "../../styles/Settings.css"

// ==========================================
// Invoice Settings
// ==========================================

function InvoiceSettings() {
  const { settings, editSettings } = useSetting();

  const [formData, setFormData] = useState({
    prefix: "INV-",
    dueDays: 30,
    notes: "",
    terms: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        prefix: settings.invoice?.prefix || "INV-",
        dueDays: settings.invoice?.dueDays || 30,
        notes: settings.invoice?.notes || "",
        terms: settings.invoice?.terms || "",
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editSettings({
      invoice: formData,
      tax: settings.tax,
    });
  };

  return (
    <div className="setting-card">
      <h2>Invoice Settings</h2>

      <form className="setting-form" onSubmit={handleSubmit}>
        <div className="setting-group">
          <label>Invoice Prefix</label>

          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
          />
        </div>

        <div className="setting-group">
          <label>Default Due Days</label>

          <input
            type="number"
            name="dueDays"
            value={formData.dueDays}
            onChange={handleChange}
          />
        </div>

        <div className="setting-group">
          <label>Default Notes</label>

          <textarea
            rows="3"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="setting-group">
          <label>Terms & Conditions</label>

          <textarea
            rows="4"
            name="terms"
            value={formData.terms}
            onChange={handleChange}
          />
        </div>

        <button className="setting-save-btn">Save Invoice Settings</button>
      </form>
    </div>
  );
}

export default InvoiceSettings;
