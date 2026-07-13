// ==========================================
// Security Settings
// ==========================================

function SecuritySettings() {
  return (
    <div className="setting-card">
      <h2>Security</h2>

      <form className="setting-form">
        <div className="setting-group">
          <label>Current Password</label>

          <input type="password" placeholder="Enter current password" />
        </div>

        <div className="setting-group">
          <label>New Password</label>

          <input type="password" placeholder="Enter new password" />
        </div>

        <div className="setting-group">
          <label>Confirm Password</label>

          <input type="password" placeholder="Confirm new password" />
        </div>

        <button className="setting-save-btn">Change Password</button>
      </form>
    </div>
  );
}

export default SecuritySettings;
