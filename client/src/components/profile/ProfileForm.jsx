// ==========================================
// Imports
// ==========================================

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "../../styles/Profile.css";

// ==========================================
// Profile Form
// ==========================================

function ProfileForm({ profile, onSubmit }) {
  // ==========================================
  // React Hook Form
  // ==========================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // ==========================================
  // Load Profile
  // ==========================================

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile, reset]);

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="profile-form-card">
      <div className="profile-form-header">
        <h2>Personal Information</h2>
      </div>

      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}

        <div className="profile-form-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter full name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="profile-error">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}

        <div className="profile-form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="profile-error">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}

        <div className="profile-form-group">
          <label>Phone</label>

          <input
            type="text"
            placeholder="Enter phone number"
            {...register("phone")}
          />
        </div>

        {/* Save */}

        <button type="submit" className="profile-save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
