import { Routes, Route } from "react-router-dom";
import "./App.css";

import Kids from "./Kids";
import Mobiles from "./Mobiles";
import Navbar from "./Navbar";
import Home from "./Home";


function App() {
  return (
    <>
      <center>
        <h2>Routing App</h2>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mobiles" element={<Mobiles />} />
          <Route path="/kids" element={<Kids />} />
        </Routes>
      </center>
    </>
  );
}

export default App;