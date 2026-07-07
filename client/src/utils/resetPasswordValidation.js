import * as yup from "yup";

const resetPasswordValidation = yup.object({

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm Password is required"),

});

export default resetPasswordValidation;