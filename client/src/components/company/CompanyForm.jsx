import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadCompanyLogo } from "../../services/companyService";
import { toast } from "react-toastify";
import { uploadCompanySignature } from "../../services/companyService";
import "../../styles/CompanySettings.css"

function CompanyForm({ company, onSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      companyName: "",
      gstNumber: "",
      panNumber: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
      terms: "",
    },
  });

  useEffect(() => {
    if (company) {
      reset(company);
    }
  }, [company, reset]);


  const handleLogoUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    await uploadCompanyLogo(file);

    toast.success("Logo uploaded successfully.");

    window.location.reload();
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Logo upload failed."
    );
  }
};

const handleSignatureUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    await uploadCompanySignature(file);

    toast.success("Signature uploaded successfully.");

    window.location.reload();
  } catch (error) {
    toast.error("Signature upload failed.");
  }
};

  return (
    <form className="company-form" onSubmit={handleSubmit(onSubmit)}>
      {/* ================= Company Information ================= */}

      {/* ================= Company Logo ================= */}

<div className="company-section">
  <h3>Logo & Signature</h3>

  <div className="company-media-row">
    <div className="company-media-item">
      <h4>Company Logo</h4>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      {company?.logo && (
        <img
          src={`http://localhost:5000/uploads/logos/${company.logo}`}
          alt="Company Logo"
          className="company-logo-preview"
        />
      )}
    </div>

    <div className="company-media-item">
      <h4>Signature</h4>
      <input type="file" accept="image/*" onChange={handleSignatureUpload} />
      {company?.signature && (
        <img
          src={`http://localhost:5000/uploads/logos/${company.signature}`}
          alt="Signature"
          className="company-signature-preview"
        />
      )}
    </div>
  </div>
</div>

      <div className="company-section">
        <h3>Company Information</h3>

        <div className="company-grid">
          <input {...register("companyName")} placeholder="Company Name" />

          <input {...register("gstNumber")} placeholder="GST Number" />

          <input {...register("panNumber")} placeholder="PAN Number" />

          <input {...register("email")} placeholder="Email" />

          <input {...register("phone")} placeholder="Phone" />

          <input {...register("website")} placeholder="Website" />
        </div>
      </div>

      {/* ================= Address ================= */}

      <div className="company-section">
        <h3>Address</h3>

        <div className="company-grid">
          <textarea {...register("address")} placeholder="Address" rows={3} />

          <input {...register("city")} placeholder="City" />

          <input {...register("state")} placeholder="State" />

          <input {...register("pincode")} placeholder="Pincode" />
        </div>
      </div>

      {/* ================= Bank Details ================= */}

      <div className="company-section">
        <h3>Bank Details</h3>

        <div className="company-grid">
          <input {...register("bankName")} placeholder="Bank Name" />

          <input {...register("accountHolder")} placeholder="Account Holder" />

          <input {...register("accountNumber")} placeholder="Account Number" />

          <input {...register("ifscCode")} placeholder="IFSC Code" />

          <input {...register("upiId")} placeholder="UPI ID" />

          {/* <input type="file" accept="image/*" /> */}
        </div>
      </div>

      {/* ================= Terms ================= */}

      <div className="company-section">
        <h3>Terms & Conditions</h3>

        <textarea
          {...register("terms")}
          rows={5}
          placeholder="Enter terms & conditions..."
        />
      </div>

      {/* ================= Button ================= */}

      <button type="submit" className="company-save-btn">
        {company ? "Update Company" : "Save Company"}
      </button>
    </form>
  );
}

export default CompanyForm;
