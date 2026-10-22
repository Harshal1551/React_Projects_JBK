import { useState } from "react";
import UserContext from "./UserContext";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  const [username, setUsername] = useState("Harshal");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <h1>Context API Example</h1>
      <Home />
      <Profile />
    </UserContext.Provider>
  );
}

export default App;