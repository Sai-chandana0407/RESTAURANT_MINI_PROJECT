import React from "react";
import "./OwnerLogin.css";
import { useNavigate } from "react-router-dom";
//import logo from "../assets/luxury-home-logo.jpg"; // Ensure this exists

const OwnerLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="owner-login">
      <div className="header">
        {/* <img src={logo} alt="Homely Bites Logo" className="logo" /> */}
        <h2 className="brand-name">Homely Bites</h2>
      </div>
      <h1 className="login-title">OWNER LOGIN</h1>

      <div className="buttons-container">
        <button className="login-btn" onClick={() => navigate("/items-list")}>ADD ITEMS</button>
        <button className="login-btn" onClick={() => navigate("/items-list")}>REMOVE ITEMS</button>
        <button className="login-btn" onClick={() => navigate("/employee-list")}>EMPLOYEE DATA</button>
        <button className="login-btn" onClick={() => navigate("/employee-profile")}>PROFILE UPDATE</button>
        
      </div>
    </div>
  );
};

export default OwnerLogin;