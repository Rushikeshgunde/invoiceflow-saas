// ==========================================
// Imports
// ==========================================

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import PageHeader from "../components/common/PageHeader";

import ProfileCard from "../components/profile/ProfileCard";
// import ProfileStats from "../components/profile/ProfileStats";
import ProfileForm from "../components/profile/ProfileForm";

import { getProfile, updateProfile } from "../services/profileService";

import "../styles/Profile.css";

// ==========================================
// Profile Page
// ==========================================

function Profile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Load Profile
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      setProfile(res.user);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      console.log(formData);
      await updateProfile(formData);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to update profile.");
    }
  };
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="profile-page">
      <PageHeader title="Profile" subtitle="Manage your account information" />

      <div className="profile-layout">
        <ProfileCard profile={profile} />

        <div className="profile-content">
          {/* <ProfileStats profile={profile} /> */}

          <ProfileForm profile={profile} onSubmit={handleSave} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
