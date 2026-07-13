// ==========================================
// Imports
// ==========================================

import { useEffect, useState } from "react";

import { useSetting } from "../../context/SettingContext";

// ==========================================
// Tax Settings
// ==========================================

function TaxSettings() {
  const { settings, editSettings } = useSetting();

  const [formData, setFormData] = useState({
    gstRate: 18,
    currency: "INR",
    taxInclusive: false,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        gstRate: settings.tax?.gstRate || 18,
        currency: settings.tax?.currency || "INR",
        taxInclusive: settings.tax?.taxInclusive || false,
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editSettings({
      invoice: settings.invoice,
      tax: formData,
    });
  };

  return (
    <div className="setting-card">
      <h2>Tax Settings</h2>

      <form className="setting-form" onSubmit={handleSubmit}>
        <div className="setting-group">
          <label>Default GST</label>

          <select
            name="gstRate"
            value={formData.gstRate}
            onChange={handleChange}
          >
            <option value={5}>5%</option>
            <option value={12}>12%</option>
            <option value={18}>18%</option>
            <option value={28}>28%</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Currency</label>

          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />
        </div>

        <div className="setting-checkbox">
          <input
            type="checkbox"
            name="taxInclusive"
            checked={formData.taxInclusive}
            onChange={handleChange}
          />

          <label>Tax Inclusive</label>
        </div>

        <button className="setting-save-btn">Save Tax Settings</button>
      </form>
    </div>
  );
}

export default TaxSettings;
