import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../context/NotificationContext";

import CustomerInput from "./CustomerInput";
import CustomerSelect from "./CustomerSelect";

import customerSchema from "../../utils/customerValidation";

import { createCustomer, updateCustomer } from "../../services/customerService";
import { successToast, errorToast } from "../../utils/toast";
import "../../styles/Customers.css";

function CustomerForm({ onClose, refreshCustomers, customer }) {

  const { refreshNotifications } = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(customerSchema),

    defaultValues: {
      customerName: "",
      businessName: "",
      email: "",
      phone: "",
      gstNumber: "",
      panNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      status: "Active",
    },
  });

  // ==========================================
  // Populate form while editing
  // ==========================================

  useEffect(() => {
    if (customer) {
      reset({
        customerName: customer.customerName || "",
        businessName: customer.businessName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        gstNumber: customer.gstNumber || "",
        panNumber: customer.panNumber || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode: customer.pincode || "",
        status: customer.status || "Active",
      });
    } else {
      reset({
        customerName: "",
        businessName: "",
        email: "",
        phone: "",
        gstNumber: "",
        panNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        status: "Active",
      });
    }
  }, [customer, reset]);

  // ==========================================
  // Submit
  // ==========================================

const onSubmit = async (data) => {
  try {
    if (customer) {
      await updateCustomer(customer._id, data);

      successToast("Customer updated successfully.");
    } else {
      await createCustomer(data);

      // Refresh Notification Bell
      await refreshNotifications();

      successToast("Customer added successfully.");
    }

    await refreshCustomers();

    onClose();

    reset();
  } catch (error) {
    console.error(error);

    errorToast(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

  return (
    <form className="customer-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="customer-grid">
        <CustomerInput
          label="Customer Name"
          name="customerName"
          register={register}
          error={errors.customerName}
          required
        />

        <CustomerInput
          label="Business Name"
          name="businessName"
          register={register}
          error={errors.businessName}
        />

        <CustomerInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />

        <CustomerInput
          label="Phone"
          name="phone"
          register={register}
          error={errors.phone}
          required
        />

        <CustomerInput
          label="GST Number"
          name="gstNumber"
          register={register}
          error={errors.gstNumber}
        />

        <CustomerInput
          label="PAN Number"
          name="panNumber"
          register={register}
          error={errors.panNumber}
        />

        <CustomerInput
          label="City"
          name="city"
          register={register}
          error={errors.city}
        />

        <CustomerInput
          label="State"
          name="state"
          register={register}
          error={errors.state}
        />

        <CustomerInput
          label="Pincode"
          name="pincode"
          register={register}
          error={errors.pincode}
        />

        <CustomerSelect
          label="Status"
          name="status"
          register={register}
          error={errors.status}
          options={[
            {
              label: "Active",
              value: "Active",
            },
            {
              label: "Inactive",
              value: "Inactive",
            },
          ]}
        />
      </div>

      <div className="address-group">
        <label htmlFor="address">Address</label>

        <textarea
          id="address"
          rows="4"
          className="input textarea"
          {...register("address")}
        />

        {errors.address && (
          <p className="error-text">{errors.address.message}</p>
        )}
      </div>

      <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className="save-btn" disabled={isSubmitting}>
          {customer ? "Update Customer" : "Save Customer"}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
