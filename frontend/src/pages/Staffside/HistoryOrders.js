import React from "react";
import "./Orders.css"; // Importing the CSS file

const orders = [
  { name: "PESARATTU", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { name: "ESPRESSO MARTINI", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { name: "MISAL PAV", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { name: "PANEER BIRYANI", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { name: "HYDERABADI BIRYANI", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { name: "KHANDVI", description: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

const HistoryOrders = () => {
  return (
    <div className="orders-container">
      <h1 className="title">HISTORY ORDERS</h1>
      <ul className="orders-list">
        {orders.map((order, index) => (
          <li key={index} className="order-item">
            <div className="order-info">
              <h3>{order.name}</h3>
              <p>{order.description}</p>
            </div>
            {
              <div className="order-time">
                <span>Jun 10, 2024</span>
                <span>9:41 AM</span>
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryOrders;