import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
const initialCart = [
  { id: 1, name: "Chocolate Cake", price: 200, image: "/img/cake.jpeg", quantity: 1 },
  { id: 2, name: "Idli", price: 200, image: "/img/idli.jpeg", quantity: 1 },
];

function Cart  ()
 {
  const [cart, setCart] = useState(initialCart);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img7.jpg') no-repeat center center/cover`,
      }}
    >
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold text-center mx-auto">CART</h2>
        <a href="/menu" className="fw-bold text-decoration-none">Back to menu</a>
      </div>

      {/* Cart Items */}
      <div className="card p-4 mt-3">
        {cart.map((item) => (
          <div key={item.id} className="d-flex align-items-center border-bottom pb-3 mb-3">
            <input type="radio" className="me-3" />
            <img src={item.image} alt={item.name} className="rounded" width="80" />
            <div className="flex-grow-1 mx-3">
              <h5 className="fw-bold">{item.name}</h5>
              <p className="mb-0 fw-bold">Rs.{item.price}</p>
            </div>
            <div className="d-flex align-items-center">
              <button className="btn btn-warning mx-1" onClick={() => decreaseQuantity(item.id)}>-</button>
              <span className="fw-bold">{item.quantity}</span>
              <button className="btn btn-warning mx-1" onClick={() => increaseQuantity(item.id)}>+</button>
              <FaTrash className="text-danger ms-3" style={{ cursor: "pointer" }} onClick={() => removeItem(item.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
      <Link to="/orderSummary" className="btn btn-warning fw-bold mx-2">Place Order</Link>
      <Link to="/orderSummary" className="btn btn-warning fw-bold mx-2">Take Away</Link>
      <Link to="/reserveTable" className="btn btn-warning fw-bold mx-2">ReserveTable</Link>
      </div>
    </div>
    </div>
  );
};

export default Cart;
