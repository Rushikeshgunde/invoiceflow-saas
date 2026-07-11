import api from "./api";

// ==========================================
// Get Profile
// ==========================================

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");

  return data;
};

// ==========================================
// Update Profile
// ==========================================

export const updateProfile = async (profileData) => {
  const { data } = await api.put("/users/profile", profileData);

  return data;
};

export const uploadProfileImage =
  async (file) => {
    const formData = new FormData();

    formData.append(
      "profileImage",
      file
    );

    const { data } =
      await api.post(
        "/users/profile/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;
  };