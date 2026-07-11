import api from "./api";

// ==========================================
// Get Company
// ==========================================

export const getCompany = async () => {
  const { data } = await api.get("/company");
  return data;
};

// ==========================================
// Create Company
// ==========================================

export const createCompany = async (companyData) => {
  const { data } = await api.post("/company", companyData);
  return data;
};

// ==========================================
// Update Company
// ==========================================

export const updateCompany = async (companyData) => {
  const { data } = await api.put("/company", companyData);
  return data;
};

export const uploadCompanyLogo = async (file) => {
  const formData = new FormData();

  formData.append("logo", file);

  const { data } = await api.post("/company/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};


export const uploadCompanySignature = async (file) => {
  const formData = new FormData();

  formData.append("signature", file);

  const { data } = await api.post(
    "/company/signature",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};