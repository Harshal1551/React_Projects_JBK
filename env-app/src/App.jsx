
import { useState } from "react";
import "./App.css";
import ProductForm from "./ProductForm";
import ShowProducts from "./ShowProducts";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [edit, setEdit] = useState(null);

  const refreshProducts = () => {
    setRefresh((previous) => previous + 1);
    setEdit(null);
  };

  const handleEdit = (product) => {
    setEdit(product);
  };

  return (
    <div>
      <center>
        <h1>Welcome to ENV App</h1>

        <ProductForm
          refreshProducts={refreshProducts}
          getEdit={edit}
        />

        <hr />

        <ShowProducts
          refresh={refresh}
          handleEdit={handleEdit}
        />
      </center>
    </div>
  );
}

export default App;
