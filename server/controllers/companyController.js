const Company = require("../models/Company");

// ==========================================
// Get Company
// ==========================================

const getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Create Company
// ==========================================

const createCompany = async (req, res) => {
  try {
    const exists = await Company.findOne({
      user: req.user.id,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists.",
      });
    }

    const company = await Company.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Company
// ==========================================

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      {
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const uploadLogo = async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company.logo = req.file.filename;

    await company.save();

    res.json({
      success: true,
      logo: company.logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Upload Signature
// ==========================================

const uploadSignature = async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company.signature = req.file.filename;

    await company.save();

    res.status(200).json({
      success: true,
      signature: company.signature,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCompany,
  createCompany,
  updateCompany,
  uploadLogo,
  uploadSignature,
};
