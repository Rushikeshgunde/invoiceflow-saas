const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    gstNumber: String,

    panNumber: String,

    email: String,

    phone: String,

    website: String,

    address: String,

    city: String,

    state: String,

    pincode: String,

    logo: String,

    signature: String,

    bankName: String,

    accountNumber: String,

    ifscCode: String,

    accountHolder: String,

    upiId: String,

    terms: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);
