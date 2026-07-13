const Customer = require("../models/Customer");
const createNotification = require("../utils/createNotification");
// const createNotification = require("../utils/createNotification");
// ===============================
// Create Customer
// ===============================
const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      user: req.user.id,
    });

    await createNotification({
  user: req.user.id,
  title: "Customer Added",
  message: `${customer.customerName} added successfully.`,
  type: "customer",
});

    res.status(201).json({
      success: true,
      message: "Customer added successfully.",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create customer.",
      error: error.message,
    });
  }
};

// ===============================
// Get All Customers
// ===============================
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    // console.log(customers);

    res.status(200).json({
      success: true,
      count: customers.length,
      customers, 
    });
  } catch (error) {
     console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
      error: error.message,
    });
  }
};

// ===============================
// Get Single Customer
// ===============================
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer.",
      error: error.message,
    });
  }
};

// ===============================
// Update Customer
// ===============================
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update customer.",
      error: error.message,
    });
  }
};

// ===============================
// Delete Customer
// ===============================
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};