import * as yup from "yup";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid phone number")
    .required("Phone is required"),

  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});

export default registerSchema;