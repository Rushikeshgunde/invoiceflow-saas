const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");
const customerRoutes =require("./routes/customerRoutes");

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/customers", customerRoutes);

app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InvoiceFlow API Running Successfully 🚀",
  });
});

app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route",

    user: req.user,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});


