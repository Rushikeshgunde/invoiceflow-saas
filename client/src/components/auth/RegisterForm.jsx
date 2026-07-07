import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { toast } from "react-toastify";

import api from "../../services/api";
import registerSchema from "../../utils/registerValidation";

import "../../styles/Register.css";

function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/auth/register", data);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-card">
      <h2 className="register-title">Create Account</h2>

      <p className="register-subtitle">Start your free InvoiceFlow account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`register-field ${errors.name ? "register-field-error" : ""}`}>
          <input
            id="name"
            type="text"
            placeholder=" "
            {...register("name")}
          />
          <label htmlFor="name">Full Name</label>
        </div>
        {/* <p className="register-error">{errors.name?.message}</p> */}

        <div className={`register-field ${errors.email ? "register-field-error" : ""}`}>
          <input
            id="email"
            type="email"
            placeholder=" "
            {...register("email")}
          />
          <label htmlFor="email">Email Address</label>
        </div>
        {/* <p className="register-error">{errors.email?.message}</p> */}

        <div className={`register-field ${errors.phone ? "register-field-error" : ""}`}>
          <input
            id="phone"
            type="text"
            placeholder=" "
            {...register("phone")}
          />
          <label htmlFor="phone">Phone Number</label>
        </div>
        {/* <p className="register-error">{errors.phone?.message}</p> */}

        <div className={`register-field ${errors.password ? "register-field-error" : ""}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            {...register("password")}
          />
          <label htmlFor="password">Password</label>
          <button
            type="button"
            className="register-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        {/* <p className="register-error">{errors.password?.message}</p> */}

        <div
          className={`register-field ${
            errors.confirmPassword ? "register-field-error" : ""
          }`}
        >
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder=" "
            {...register("confirmPassword")}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <button
            type="button"
            className="register-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        {/* <p className="register-error">{errors.confirmPassword?.message}</p> */}

        <button type="submit" disabled={loading} className="register-btn">
          {loading ? <span className="register-spinner" /> : "Create Free Account"}
        </button>
      </form>

      <p className="register-login-text">
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterForm;