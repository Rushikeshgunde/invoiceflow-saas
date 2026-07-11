// ----------------------------------------------------------------------------------
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InvoiceInput from "./InvoiceInput";
import InvoiceSelect from "./InvoiceSelect";
import invoiceSchema from "../../utils/invoiceValidation";
import InvoiceItemsTable from "./InvoiceItemsTable";
import "../../styles/Invoices.css";

import { createInvoice, updateInvoice } from "../../services/invoiceService";
import { toast } from "react-toastify";
// ==========================================
// Product API
// ==========================================
import { getProducts } from "../../services/productService";
import { getCustomers } from "../../services/customerService";

// ==========================================
// Prepare Invoice Items
// ==========================================
const createEmptyItem = () => ({
  id: Date.now() + Math.random(),
  product: "",
  sku: "",
  quantity: 1,
  price: 0,
  discount: 0,
  gst: 18,
  total: 0,
});

function InvoiceForm({ onClose, onAdd, onUpdate, invoice }) {
  // ==========================================
  // Invoice Items State
  // ==========================================
  const [items, setItems] = useState([createEmptyItem()]);

  // ==========================================
  // Products for Dropdown
  // ==========================================
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);
  // Load Products & Customers
  // ==========================================
  //   useEffect(() => {
  //     const loadMasterData = async () => {
  //       try {
  //         const [productRes, customerRes] = await Promise.all([
  //           getProducts(),
  //           getCustomers(),
  //         ]);

  //         console.log(customerRes.customers);
  // console.table(customerRes.customers);

  //         setProducts(
  //           Array.isArray(productRes?.products) ? productRes.products : [],
  //         );
  //         setCustomers(
  //           Array.isArray(customerRes?.customers) ? customerRes.customers : [],
  //         );
  //       } catch (error) {
  //         console.error(error);
  //         toast.error("Unable to load master data.");
  //       }
  //     };

  //     loadMasterData();
  //   }, []);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        setMasterLoading(true);

        const [productRes, customerRes] = await Promise.all([
          getProducts(),
          getCustomers(),
        ]);

        setProducts(
          Array.isArray(productRes?.products) ? productRes.products : [],
        );

        setCustomers(
          Array.isArray(customerRes?.customers) ? customerRes.customers : [],
        );
      } catch (error) {
        console.error(error);
        toast.error("Unable to load master data.");
      } finally {
        setMasterLoading(false);
      }
    };

    loadMasterData();
  }, []);
  // ==========================================
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await getProducts();

  //       // CHANGE: same defensive guard as Products.jsx — avoid setting
  //       // non-array state if the API response shape is unexpected.
  //       setProducts(Array.isArray(res?.products) ? res.products : []);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(invoiceSchema),

    defaultValues: {
      customer: "",
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      paymentStatus: "Unpaid",
      notes: "",
    },
  });

 
  // ==========================================
  // Load Customers
  // ==========================================

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       const res = await getCustomers();

  //       setCustomers(Array.isArray(res.customers) ? res.customers : []);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  // ==========================================
  // Populate form + items while editing
  // ==========================================


  useEffect(() => {
    if (invoice) {
      reset({
        customer: invoice.customer?._id || invoice.customer || "",
        invoiceNumber: invoice.invoiceNumber || `INV-${Date.now()}`,
        invoiceDate:
          invoice.invoiceDate?.split("T")[0] ||
          new Date().toISOString().split("T")[0],
        dueDate: invoice.dueDate?.split("T")[0] || "",
        paymentStatus: invoice.paymentStatus || "Unpaid",
        notes: invoice.notes || "",
      });

setItems(
  invoice.items?.length
    ? invoice.items.map((item) => ({
        id: Date.now() + Math.random(),
        product: item.product?._id || item.product,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        gst: item.gst,
        total: item.total,
      }))
    : [createEmptyItem()]
);

} else {
      reset({
        customer: "",
        invoiceNumber: `INV-${Date.now()}`,
        invoiceDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        paymentStatus: "Unpaid",
        notes: "",
      });

      setItems([createEmptyItem()]);
    }
  }, [invoice, reset]);

  //   =================Add Invoice Item ==========================
  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  // ==========================================
  // Delete Invoice Item
  // ==========================================
  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ======Update Invoice Item / Auto Fill Product Details ===============

  // ==========================================
  // Update Invoice Item
  // Auto Fill + Live Calculation
  // ==========================================
  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        let updatedItem = {
          ...item,
          [field]: value,
        };

        // ==========================================
        // Auto Fill Product Details
        // ==========================================
        if (field === "product") {
          const selectedProduct = products.find((p) => p._id === value);

          if (selectedProduct) {
            updatedItem = {
              ...updatedItem,
              sku: selectedProduct.sku,
              price: selectedProduct.sellingPrice,
              gst: selectedProduct.gst,
            };
          }
        }

        // ==========================================
        // Calculate Line Total
        // ==========================================
        const quantity = Number(updatedItem.quantity) || 0;
        const price = Number(updatedItem.price) || 0;
        const discount = Number(updatedItem.discount) || 0;
        const gst = Number(updatedItem.gst) || 0;

        const amount = quantity * price;
        const discountAmount = amount * (discount / 100);
        const taxableAmount = amount - discountAmount;
        const gstAmount = taxableAmount * (gst / 100);
        const total = taxableAmount + gstAmount;

        updatedItem.total = Number(total.toFixed(2));

        return updatedItem;
      }),
    );
  };

  // ==========================================
  // Invoice Summary
  // ==========================================
  const invoiceSummary = useMemo(() => {
    let subtotal = 0;
    let gstTotal = 0;
    let grandTotal = 0;

    items.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const discount = Number(item.discount) || 0;
      const gst = Number(item.gst) || 0;

      const amount = qty * price;
      const discountAmount = amount * (discount / 100);
      const taxable = amount - discountAmount;
      const gstAmount = taxable * (gst / 100);

      subtotal += taxable;
      gstTotal += gstAmount;
      grandTotal += taxable + gstAmount;
    });

    return {
      subtotal,
      gstTotal,
      grandTotal,
    };
  }, [items]);

  // ==========================================
  // Save Invoice
  // ==========================================

  const onSubmit = async (data) => {

  
    try {
      // ==========================================
      // Validation
      // ==========================================

      if (!data.customer) {
        toast.error("Please select customer.");
        return;
      }

      if (items.length === 0) {
        toast.error("Please add at least one item.");
        return;
      }

      if (items.some((item) => !item.product)) {
        toast.error("Please select product.");
        return;
      }

      if (items.some((item) => !item.sku)) {
        toast.error("Please select a valid product.");
        return;
      }

      const invoiceItems = items.map((item) => ({
        product: item.product,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        gst: item.gst,
        total: item.total,
      }));

      const invoiceData = {
        customer: data.customer,
        invoiceNumber: data.invoiceNumber,
        invoiceDate: data.invoiceDate,
        dueDate: data.dueDate,
        paymentStatus: data.paymentStatus,
        items: invoiceItems,
        subtotal: invoiceSummary.subtotal,
        gstTotal: invoiceSummary.gstTotal,
        grandTotal: invoiceSummary.grandTotal,
        notes: data.notes,
      };

     
      if (invoice) {
        const response = await updateInvoice(invoice._id, invoiceData);
        toast.success(response.message || "Invoice updated successfully.");
        onUpdate(response.invoice);
      } else {
        const response = await createInvoice(invoiceData);
        toast.success(response.message || "Invoice added successfully.");
        onAdd(response.invoice);
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to save invoice.");
    }
  };


  if (masterLoading) {
    return (
      <div className="invoice-loading">Loading customers and products...</div>
    );
  }

  // console.log("Customers State:", customers);
  return (
    <form className="invoice-form" onSubmit={handleSubmit(onSubmit)}>
      {/* ==========================================
          Header Grid
      ========================================== */}

      
      <div className="invoice-form-grid">
        <InvoiceSelect
          label="Customer"
          name="customer"
          register={register}
          error={errors.customer}
          required
          options={[
            {
              label: "Select Customer",
              value: "",
            },

            ...customers.map((customer) => ({
              label: customer.customerName,
              value: customer._id,
            })),
          ]}
        />

        <InvoiceInput
          label="Invoice Number"
          name="invoiceNumber"
          register={register}
          error={errors.invoiceNumber}
          required
        />

        <InvoiceInput
          label="Invoice Date"
          type="date"
          name="invoiceDate"
          register={register}
          error={errors.invoiceDate}
          required
        />

        <InvoiceInput
          label="Due Date"
          type="date"
          name="dueDate"
          register={register}
          error={errors.dueDate}
          required
        />

        <InvoiceSelect
          label="Payment Status"
          name="paymentStatus"
          register={register}
          error={errors.paymentStatus}
          required
          options={[
            { label: "Unpaid", value: "Unpaid" },
            { label: "Paid", value: "Paid" },
            { label: "Partially Paid", value: "Partially Paid" },
          ]}
        />
      </div>

      {/* ==========================================
    Invoice Items
========================================== */}
      <InvoiceItemsTable
        items={items}
        products={products}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onItemChange={handleItemChange}
      />

      {/* ==========================================
    Invoice Summary
========================================== */}
      <div className="invoice-summary-card">
        <div className="invoice-summary-row">
          <span>Subtotal</span>
          <strong>₹{invoiceSummary.subtotal.toFixed(2)}</strong>
        </div>

        <div className="invoice-summary-row">
          <span>GST</span>
          <strong>₹{invoiceSummary.gstTotal.toFixed(2)}</strong>
        </div>

        <div className="invoice-summary-row invoice-summary-total">
          <span>Total Amount</span>
          <strong>₹{invoiceSummary.grandTotal.toFixed(2)}</strong>
        </div>
      </div>

      {/* ==========================================
          Notes
      ========================================== */}
      <div className="invoice-notes-group">
        <label>Notes</label>
        <textarea
          rows="4"
          className="invoice-textarea"
          {...register("notes")}
        />
      </div>

      {/* ==========================================
          Footer Buttons
      ========================================== */}
      <div className="invoice-form-buttons">
        <button type="button" className="invoice-cancel-btn" onClick={onClose}>
          Cancel
        </button>

        {/* CHANGE: disable while submitting (same as ProductForm) to
            prevent double-submits, and label reflects add vs edit mode. */}
        <button
          type="submit"
          className="invoice-save-btn"
          disabled={isSubmitting}
        >
          {invoice ? "Update Invoice" : "Save Invoice"}
        </button>
      </div>
    </form>


  );
}

export default InvoiceForm;
