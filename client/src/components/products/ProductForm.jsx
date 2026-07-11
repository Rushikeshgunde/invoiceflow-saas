import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import ProductInput from "./ProductInput";
import ProductSelect from "./ProductSelect";

import productSchema from "../../utils/productValidation";
import { createProduct, updateProduct } from "../../services/productService";

import "../../styles/Products.css";

function ProductForm({ onClose, refreshProducts, product }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(productSchema),

    defaultValues: {
      productName: "",
      sku: "",
      category: "",
      brand: "",
      purchasePrice: "",
      sellingPrice: "",
      gst: 18,
      unit: "Nos",
      stock: 0,
      lowStock: 5,
      description: "",
      status: "Active",
    },
  });

  // ======================================
  // Populate form while editing
  // ======================================

  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName || "",
        sku: product.sku || "",
        category: product.category || "",
        brand: product.brand || "",
        purchasePrice: product.purchasePrice || "",
        sellingPrice: product.sellingPrice || "",
        gst: product.gst ?? 18,
        unit: product.unit || "Nos",
        stock: product.stock ?? 0,
        lowStock: product.lowStock ?? 5,
        description: product.description || "",
        status: product.status || "Active",
      });
    } else {
      reset({
        productName: "",
        sku: "",
        category: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        gst: 18,
        unit: "Nos",
        stock: 0,
        lowStock: 5,
        description: "",
        status: "Active",
      });
    }
  }, [product, reset]);

  // ======================================
  // Submit
  // ======================================

  const onSubmit = async (data) => {
    try {
      if (product) {
        await updateProduct(product._id, data);
        toast.success("Product updated successfully.");
      } else {
        await createProduct(data);
        toast.success("Product added successfully.");
      }

      refreshProducts();

      reset();

      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="product-grid">
        <ProductInput
          label="Product Name"
          name="productName"
          register={register}
          error={errors.productName}
          required
        />

        <ProductInput
          label="SKU"
          name="sku"
          register={register}
          error={errors.sku}
          required
        />

        <ProductSelect
          label="Category"
          name="category"
          register={register}
          error={errors.category}
          required
          options={[
            {
              label: "Electronics",
              value: "Electronics",
            },
            {
              label: "Accessories",
              value: "Accessories",
            },
            {
              label: "Furniture",
              value: "Furniture",
            },
            {
              label: "Clothing",
              value: "Clothing",
            },
          ]}
        />

        <ProductInput
          label="Brand"
          name="brand"
          register={register}
          error={errors.brand}
        />

        <ProductInput
          label="Purchase Price"
          type="number"
          name="purchasePrice"
          register={register}
          error={errors.purchasePrice}
          required
        />

        <ProductInput
          label="Selling Price"
          type="number"
          name="sellingPrice"
          register={register}
          error={errors.sellingPrice}
          required
        />

        <ProductSelect
          label="GST %"
          name="gst"
          register={register}
          error={errors.gst}
          required
          options={[
            {
              label: "0%",
              value: 0,
            },
            {
              label: "5%",
              value: 5,
            },
            {
              label: "12%",
              value: 12,
            },
            {
              label: "18%",
              value: 18,
            },
            {
              label: "28%",
              value: 28,
            },
          ]}
        />

        <ProductSelect
          label="Unit"
          name="unit"
          register={register}
          error={errors.unit}
          required
          options={[
            {
              label: "Nos",
              value: "Nos",
            },
            {
              label: "Kg",
              value: "Kg",
            },
            {
              label: "Litre",
              value: "Litre",
            },
            {
              label: "Box",
              value: "Box",
            },
            {
              label: "Pack",
              value: "Pack",
            },
          ]}
        />

        <ProductInput
          label="Stock Quantity"
          type="number"
          name="stock"
          register={register}
          error={errors.stock}
          //  onWheel={(e) => e.target.blur()} 
          required
        />

        <ProductInput
          label="Low Stock Alert"
          type="number"
          name="lowStock"
          register={register}
          error={errors.lowStock}
          required
        />

        <ProductSelect
          label="Status"
          name="status"
          register={register}
          error={errors.status}
          required
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

      <div className="description-group">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          rows="4"
          className="input textarea"
          {...register("description")}
        />

        {errors.description && (
          <p className="error-text">{errors.description.message}</p>
        )}
      </div>

      <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className="save-btn" disabled={isSubmitting}>
          {product ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
