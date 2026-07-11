import * as yup from "yup";

const invoiceSchema = yup.object({

  customer: yup
    .string()
    .required("Customer is required."),

  invoiceNumber: yup
  .string()
  .required("Invoice number is required."),

  invoiceDate: yup
    .string()
    .required("Invoice date is required."),

  dueDate: yup
    .string()
    .required("Due date is required."),

  paymentStatus: yup
    .string()
    .required(),

  notes: yup
    .string()
});

export default invoiceSchema;