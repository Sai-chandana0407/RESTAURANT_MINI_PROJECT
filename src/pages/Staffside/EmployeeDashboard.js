import React from "react";
import "./EmployeeDashboard.css"; // Importing the CSS file
import {Link} from 'react-router-dom';
const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">EMPLOY DASH BOARD</header>
      <div className="button-container">
        <Link to="/orders" className="btn btn-warning w-10 fw-bold mx-2 my-4">ORDERS</Link>
        <Link to="/profile" className="btn btn-warning w-10 fw-bold mx-2 my-4">PROFILE UPDATE</Link>
        <Link to="/history" className="btn btn-warning w-10 fw-bold mx-2 my-4">HISTORY ORDERS</Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;