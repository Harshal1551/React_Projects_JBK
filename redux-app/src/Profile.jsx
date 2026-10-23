import { useSelector } from "react-redux";

function Profile() {
  const username = useSelector((state) => state.user.username);

  return (
    <div>
      <h2>Profile Component</h2>
      <p>Welcome, {username}!</p>
    </div>
  );
}

export default Profile;