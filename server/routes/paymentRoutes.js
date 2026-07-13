const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getPayments)
  .post(protect, createPayment);

router
  .route("/:id")
  .get(protect, getPayment)
  .put(protect, updatePayment)
  .delete(protect, deletePayment);

module.exports = router;