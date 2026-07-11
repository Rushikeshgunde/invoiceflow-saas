import { useEffect, useState } from "react";
import "../styles/CompanySettings.css";

import {
  getCompany,
  createCompany,
  updateCompany,
} from "../services/companyService";

import CompanyForm from "../components/company/CompanyForm";

import { toast } from "react-toastify";

function CompanySettings() {
  const [company, setCompany] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const res = await getCompany();

      setCompany(res.company);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (company) {
        await updateCompany(values);

        toast.success("Company updated successfully.");
      } else {
        await createCompany(values);

        toast.success("Company created successfully.");
      }

      loadCompany();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="company-page">
      <div className="page-header">
        <h1>Company Settings</h1>

        <p>Manage your company information.</p>
      </div>

      <CompanyForm
        company={company}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default CompanySettings;