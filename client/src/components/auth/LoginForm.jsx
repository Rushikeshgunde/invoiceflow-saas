import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/api";
import loginSchema from "../../utils/loginValidation";
import "../../styles/Login.css";

function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

       const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      const response = await api.post("/auth/login", payload);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.data.message);

      setTimeout(() => {
       navigate("/dashboard", { replace: true });
      }, 500);
    } catch (error) {
       const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to login. Please try again.";

      toast.error(message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Welcome Back 👋</h2>

      <p className="login-subtitle">Login to continue to InvoiceFlow</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`login-field ${errors.email ? "login-field-error" : ""}`}
        >
          <input
            id="login-email"
            type="email"
            placeholder=" "
            {...register("email")}
          />

          <label htmlFor="login-email">Email Address</label>
        </div>
        {/* <p className="login-error">{errors.email?.message}</p> */}

        <div
          className={`login-field ${errors.password ? "login-field-error" : ""}`}
        >
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            {...register("password")}
          />

          <label htmlFor="login-password">Password</label>

          <span
            className="login-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* <p className="login-error">{errors.password?.message}</p> */}

        <div className="login-options">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>

          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>

      <p className="register-link">
        Don't have an account?
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;