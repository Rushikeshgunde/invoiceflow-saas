const { body, validationResult } = require("express-validator");

// Validation Rules
const customerValidation = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 3 })
    .withMessage("Customer name must be at least 3 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit Indian mobile number"),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address"),

  body("gstNumber")
    .optional({ checkFalsy: true })
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    )
    .withMessage("Invalid GST Number"),

  body("panNumber")
    .optional({ checkFalsy: true })
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN Number"),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive"),
];

// Validation Error Handler
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  customerValidation,
  validate,
};