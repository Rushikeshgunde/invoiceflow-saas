const { body } = require("express-validator");

exports.paymentValidation = [
  body("invoice")
    .notEmpty()
    .withMessage("Invoice is required."),

//   body("customer")
//     .notEmpty()
//     .withMessage("Customer is required."),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0."),

  body("paymentDate")
    .notEmpty()
    .withMessage("Payment date is required."),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required."),
];