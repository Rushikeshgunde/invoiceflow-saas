const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const {
  customerValidation,
  validate,
} = require("../validations/customerValidation");

router.use(protect);

router.post("/", customerValidation, validate, createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", customerValidation, validate, updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
