import * as yup from "yup";

const productSchema = yup.object({
  productName: yup
    .string()
    .required("Product name is required.")
    .min(2, "Minimum 2 characters."),

  sku: yup
    .string()
    .required("SKU is required.")
    .min(3, "Minimum 3 characters."),

  category: yup
    .string()
    .required("Category is required."),

  brand: yup
    .string()
    .nullable(),

  purchasePrice: yup
    .number()
    .typeError("Purchase price is required.")
    .positive("Must be greater than 0.")
    .required("Purchase price is required."),

  sellingPrice: yup
    .number()
    .typeError("Selling price is required.")
    .positive("Must be greater than 0.")
    .required("Selling price is required."),

  gst: yup
    .number()
    .required("GST is required."),

  unit: yup
    .string()
    .required("Unit is required."),

  stock: yup
    .number()
    .typeError("Stock quantity is required.")
    .min(0, "Stock cannot be negative.")
    .required("Stock quantity is required."),

  lowStock: yup
    .number()
    .typeError("Low stock alert is required.")
    .min(0, "Cannot be negative.")
    .required("Low stock alert is required."),

  description: yup
    .string()
    .nullable(),

  status: yup
    .string()
    .oneOf(["Active", "Inactive"])
    .required("Status is required."),
});

export default productSchema;