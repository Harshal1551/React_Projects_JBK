
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigateMe = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userdetail");
    navigateMe("/", { replace: true });
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
