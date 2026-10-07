function Counter(props) {

  const handleClick = () => {
    props.sendCount(10);
  };

  return (
    <div>
      <h2>Child to Parent</h2>

      <button onClick={handleClick}>
        Send 10 to Parent
      </button>
    </div>
  );
}

export default Counter;