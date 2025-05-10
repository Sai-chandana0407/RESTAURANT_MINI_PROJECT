import React from "react";
import "./StaffLogin.css"; // Importing the CSS file
import {Link} from 'react-router-dom';
const StaffLogin = () => {
  return (
    <div className="login-container">
      <header className="login-header">STAFF LOGIN</header>
      <form className="login-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" placeholder="Name" />
        </div>
        <div className="form-group">
          <label>Emp ID:</label>
          <input type="text" placeholder="ID" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" placeholder="password" />
        </div>
        <Link to="/dashboard" className="btn btn-warning w-10 fw-bold mx-2 my-4">LOGIN</Link>
      </form>
    </div>
  );
};

export default StaffLogin;