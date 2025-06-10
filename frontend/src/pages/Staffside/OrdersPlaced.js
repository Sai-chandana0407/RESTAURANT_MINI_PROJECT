import React from "react";
import "./Ordersplaced.css";

const OrdersPlaced = () => (
  <div className="orders-container">
    <header className="orders-header">STAFF ORDERS DISABLED</header>
    <div className="alert alert-warning mt-4">
      Staff orders access is currently disabled. Please contact your administrator.
    </div>
  </div>
);

export default OrdersPlaced;