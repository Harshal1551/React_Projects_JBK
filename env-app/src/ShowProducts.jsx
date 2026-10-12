
import { useEffect, useState } from "react";
import { api } from "./apiServices";

function ShowProducts({ refresh, handleEdit }) {
  const [allProducts, setAllProducts] = useState([]);

  const loadAllProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      loadAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>All Products</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>

              <td>
                <button onClick={() => handleDelete(product.id)}>
                  Delete
                </button>{" "}

                <button onClick={() => handleEdit(product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowProducts;
