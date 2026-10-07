function User(props) {
  return (
    <div>
      <h2>User Information</h2>

      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}

export default User;