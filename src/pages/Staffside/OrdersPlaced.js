import React from "react";
import "./Ordersplaced.css";

const orders = [
  { name: "PESARATTU", date: "Jun 10, 2024", time: "9:41 AM" },
  { name: "ESPRESSO MARTINI", date: "Jun 10, 2024", time: "9:41 AM" },
  { name: "MISAL PAV", date: "Jun 10, 2024", time: "9:41 AM" },
  { name: "PANEER BIRYANI", date: "Jun 10, 2024", time: "9:41 AM" },
  { name: "HYDERABADI BIRYANI", date: "Jun 10, 2024", time: "9:41 AM" },
  { name: "KHANDVI", date: "Jun 10, 2024", time: "9:41 AM" },
];

const Ordersplaced = () => {
  return (
    <div className="orders-container">
      {/* Restaurant Logo */}
      <div className="logo-container">
        <img src="/images/logo.png" alt="Homely Bites" className="logo" />
      </div>

      {/* Title */}
      <h2>Orders Placed</h2> {/* Updated heading */}
      

      

      {/* Orders List */}
      <div className="orders-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <div className="order-details">
              <h5>{order.name}</h5>
              <p>Supporting text lorem ipsum dolor sit amet, consectetur</p>
            </div>
            <div className="order-timestamp">
              <span className="date">{order.date}</span>
              <span className="time">{order.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordersplaced;