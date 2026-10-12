
import { useEffect, useState } from "react";
import { api } from "./apiServices";

function ProductForm({ refreshProducts, getEdit }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (getEdit) {
      setForm(getEdit);
    } else {
      setForm({
        name: "",
        category: "",
        price: "",
      });
    }
  }, [getEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (getEdit) {
        await api.put(`/products/${form.id}`, form);
      } else {
        await api.post("/products", form);
      }

      setForm({
        name: "",
        category: "",
        price: "",
      });

      refreshProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div>
      <h2>{getEdit ? "Update Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <br />

        <label>
          Category:{" "}
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <br />

        <label>
          Price:{" "}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <br />

        <button type="submit">
          {getEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
