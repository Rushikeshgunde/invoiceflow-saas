import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { 
    // FaLock,
     FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../styles/ResetPassword.css";
import resetPasswordValidation from "../../utils/resetPasswordValidation";

function ResetPasswordForm() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidation),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post(`/auth/reset-password/${token}`, {
        password: data.password,
      });

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Reset Password</h2>

        <p>Create a new password</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`reset-field ${errors.password ? "reset-field-error" : ""}`}>
            {/* <FaLock className="reset-icon" /> */}

            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              placeholder=" "
              {...register("password")}
            />

            <label htmlFor="reset-password">New Password</label>

            <span
              className="reset-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* <p className="reset-error">{errors.password?.message}</p> */}

          <div className={`reset-field ${errors.confirmPassword ? "reset-field-error" : ""}`}>
            {/* <FaLock className="reset-icon" /> */}

            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder=" "
              {...register("confirmPassword")}
            />

            <label htmlFor="reset-confirm-password">Confirm Password</label>

            <span
              className="reset-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* <p className="reset-error">{errors.confirmPassword?.message}</p> */}

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;