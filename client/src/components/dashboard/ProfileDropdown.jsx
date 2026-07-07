import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaCog,
  FaKey,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import "../../styles/ProfileDropdown.css";

function ProfileDropdown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = () => {
  setOpen(false);
};

  const logout = () => {
    setOpen(false)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle size={30} />

        <span>{user?.name || "User"}</span>

        <FaChevronDown
          className={`arrow ${open ? "rotate" : ""}`}
        />
      </button>

      {open && (
        <div className="profile-menu">
          <div className="profile-header">
            <FaUserCircle size={45} />

            <h4>{user?.name}</h4>

            <p>{user?.email}</p>
          </div>

          <Link to="/dashboard/profile" onClick={handleMenuClick}>
            <FaUser />
            My Profile
          </Link>

          <Link to="/dashboard/settings" onClick={handleMenuClick}>
            <FaCog />
            Account Settings
          </Link>

          <Link to="/change-password" onClick={handleMenuClick}>
            <FaKey />
            Change Password
          </Link>

          <button onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;