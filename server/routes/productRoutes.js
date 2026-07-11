const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createProduct);

router.get("/", authMiddleware, getProducts);

router.get("/:id", authMiddleware, getProduct);

router.put("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;