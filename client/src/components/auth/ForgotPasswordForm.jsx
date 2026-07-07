import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../styles/ForgotPassword.css";
import forgotPasswordValidation from "../../utils/forgotPasswordValidation";

function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordValidation),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", data);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-card">
      <h2 className="forgot-title">Forgot Password</h2>

      <p className="forgot-subtitle">Enter your registered email address.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`forgot-field ${errors.email ? "forgot-field-error" : ""}`}>
          <input
            id="forgot-email"
            type="email"
            placeholder=" "
            {...register("email")}
          />

          <label htmlFor="forgot-email">Email Address</label>
        </div>
        {/* <p className="forgot-error">{errors.email?.message}</p> */}

        <button type="submit" disabled={loading} className="forgot-btn">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="back-login">
        <Link to="/login">← Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;