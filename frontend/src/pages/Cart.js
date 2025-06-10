import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaPlus, FaMinus, FaHome, FaUtensils, FaPhone, FaInfoCircle, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart items from localStorage or location state
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return location.state?.cartItems || [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle new items from location state
  useEffect(() => {
    if (location.state?.cartItems) {
      const newItems = location.state.cartItems;
      setCartItems(prevItems => {
        // Merge new items with existing cart
        const updatedItems = [...prevItems];
        newItems.forEach(newItem => {
          const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id);
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            updatedItems[existingItemIndex].quantity += newItem.quantity;
          } else {
            // Add new item if it doesn't exist
            updatedItems.push(newItem);
          }
        });
        return updatedItems;
      });
    }
  }, [location.state]);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{ height: '50px' }}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ height: '40px' }}>
            <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="30" height="30" className="rounded-circle me-2" />
            <span className="text-dark" style={{ fontSize: '1rem' }}>Homely Bites</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/homePage" style={{ fontSize: '0.9rem' }}>
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/menu" style={{ fontSize: '0.9rem' }}>
                  <FaUtensils className="me-1" /> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contactUs" style={{ fontSize: '0.9rem' }}>
                  <FaPhone className="me-1" /> Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about" style={{ fontSize: '0.9rem' }}>
                  <FaInfoCircle className="me-1" /> About
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button 
                  className="btn btn-link text-dark dropdown-toggle" 
                  type="button" 
                  data-bs-toggle="dropdown"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
                >
                  <FaUserCircle size={20} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold text-white p-4">CART</h2>
          <Link to="/menu" className="btn btn-warning">Back to Menu</Link>
        </div>

        {/* Cart Items */}
        <div className="card p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-4">
              <h4 className="text-dark">Your cart is empty</h4>
              <Link to="/menu" className="btn btn-warning mt-3">Continue Shopping</Link>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center border-bottom pb-3 mb-3">
                  <img src={item.image} alt={item.name} className="rounded" width="80" height="80" style={{ objectFit: 'cover' }} />
                  <div className="flex-grow-1 mx-3">
                    <h5 className="fw-bold text-dark">{item.name}</h5>
                    <p className="mb-0 text-dark">₹{item.price}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-sm btn-outline-danger me-2"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2" style={{ 
                      color: '#2c3e50',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <FaPlus />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              {/* Total Amount */}
              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 text-dark">Total Amount:</h4>
                  <h4 className="mb-0 text-dark">₹{calculateTotal()}</h4>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Link to="/orderSummary" className="btn btn-warning fw-bold">Place Order</Link>
                <Link to="/orderSummary" className="btn btn-warning fw-bold">Take Away</Link>
                <Link to="/reserveTable" className="btn btn-warning fw-bold">Reserve Table</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
