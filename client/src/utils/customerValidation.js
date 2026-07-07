import * as yup from "yup";

const customerSchema = yup.object({

  customerName: yup
    .string()
    .required("Customer name is required")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),

  businessName: yup.string(),

  email: yup
    .string()
    .email("Invalid email")
    .nullable(),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone must contain 10 digits"),

  gstNumber: yup
    .string()
    .matches(
      /^$|^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      "Invalid GST Number"
    ),

  panNumber: yup
    .string()
    .matches(
      /^$|^[A-Z]{5}[0-9]{4}[A-Z]$/,
      "Invalid PAN Number"
    ),

  address: yup.string(),

  city: yup.string(),

  state: yup.string(),

  pincode: yup
    .string()
    .matches(
      /^$|^[0-9]{6}$/,
      "Pincode must be 6 digits"
    ),

  status: yup.string().required(),

});

export default customerSchema;