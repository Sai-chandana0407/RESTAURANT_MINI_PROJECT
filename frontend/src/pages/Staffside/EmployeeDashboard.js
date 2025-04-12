import React from "react";
import "./EmployeeDashboard.css"; // Importing the CSS file
import {Link} from 'react-router-dom';
const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">EMPLOYEE DASH BOARD</header>
      <div className="button-grid">
        <div className="button-column">
          <Link to="/orders" className="dashboard-button">ORDERS</Link>
          <Link to="/profile" className="dashboard-button">PROFILE UPDATE</Link>
          <Link to="/history" className="dashboard-button">HISTORY ORDERS</Link>
        </div>
        <div className="button-column">
          <Link to="/items-list" className="dashboard-button">UPDATE MENU</Link>
          <Link to="/employee-list" className="dashboard-button">EMPLOYEE LIST</Link>
          <Link to="/logout" className="dashboard-button">LOGOUT</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;