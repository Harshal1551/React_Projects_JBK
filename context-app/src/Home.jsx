import { useContext } from "react";
import UserContext from "./UserContext";

function Home() {
  const { username, setUsername } = useContext(UserContext);

  return (
    <div>
      <h2>Home Component</h2>
      <p>Username: {username}</p>

      <button onClick={() => setUsername("Rahul")}>
        Change Username
      </button>
    </div>
  );
}

export default Home;