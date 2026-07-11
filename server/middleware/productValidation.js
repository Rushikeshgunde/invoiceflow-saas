const { body } = require("express-validator");

exports.productValidation = [
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Product name is required."),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("purchasePrice")
    .isNumeric()
    .withMessage("Purchase price must be a number."),

  body("sellingPrice")
    .isNumeric()
    .withMessage("Selling price must be a number."),

  body("gst")
    .optional()
    .isNumeric()
    .withMessage("GST must be numeric."),

  body("stock")
    .optional()
    .isNumeric()
    .withMessage("Stock must be numeric."),

  body("status")
    .optional()
    .isIn(["Active", "Inactive"])
    .withMessage("Invalid status."),
];