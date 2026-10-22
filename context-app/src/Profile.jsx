import { useContext } from "react";
import UserContext from "./UserContext";

function Profile() {
  const { username } = useContext(UserContext);

  return (
    <div>
      <h2>Profile Component</h2>
      <p>Welcome, {username}!</p>
    </div>
  );
}

export default Profile;