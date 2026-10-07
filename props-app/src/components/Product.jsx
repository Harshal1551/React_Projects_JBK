function Product(props) {
  return (
    <div>
      <h2>Product Information</h2>

      <p>Product: {props.productName}</p>
      <p>Price: ₹{props.price}</p>
      <p>Category: {props.category}</p>
    </div>
  );
}

export default Product;