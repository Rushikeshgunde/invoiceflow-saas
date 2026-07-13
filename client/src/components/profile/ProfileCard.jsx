// ==========================================
// Imports
// ==========================================

import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { uploadProfileImage } from "../../services/profileService";

import "../../styles/Profile.css";

// ==========================================
// Profile Card
// ==========================================

function ProfileCard({ profile }) {
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      await uploadProfileImage(file);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-card">
      {/* Avatar */}

      <div className="profile-avatar">
        <label htmlFor="profileImage">
          {profile?.profileImage ? (
            <img
              src={`http://localhost:5000/uploads/profile/${profile.profileImage}`}
              alt="Profile"
            />
          ) : (
            <div className="profile-avatar-placeholder">
              <FaUser />
            </div>
          )}
        </label>

        <input
          id="profileImage"
          type="file"
          hidden
          accept="image/*"
          onChange={handleImage}
        />
      </div>

      {/* Name */}

      <h2 className="profile-name">{profile?.name || "User Name"}</h2>

      {/* Role */}

      <p className="profile-role">{profile?.role || "User"}</p>

      {/* Divider */}

      <hr />

      {/* Information */}

      <div className="profile-info">
        <div className="profile-info-item">
          <FaEnvelope />

          <span>{profile?.email || "-"}</span>
        </div>

        <div className="profile-info-item">
          <FaPhone />

          <span>{profile?.phone || "-"}</span>
        </div>

        <div className="profile-info-item">
          <FaCalendarAlt />

          <span>
            Joined{" "}
            {profile?.createdAt
              ? new Date(profile.createdAt).toLocaleDateString("en-IN")
              : "-"}
          </span>
        </div>
      </div>

      {/* Button */}

      {/* <button type="button" className="profile-edit-btn">
        Edit Profile
      </button> */}
    </div>
  );
}

export default ProfileCard;
