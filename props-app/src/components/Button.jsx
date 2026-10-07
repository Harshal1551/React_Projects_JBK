function Button(props) {
  return (
    <div>
      <h2>Function Props</h2>

      <button onClick={props.onClick}>
        Click Me
      </button>
    </div>
  );
}

export default Button;