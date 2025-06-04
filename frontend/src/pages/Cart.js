import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaPlus, FaMinus, FaHome, FaUtensils, FaPhone, FaInfoCircle, FaUserCircle, FaShoppingCart, FaClipboardList } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update cart items when location changes (back navigation)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (err) {
        console.error('Error parsing cart data:', err);
      }
    }
  }, [location]);

  useEffect(() => {
    // Recalculate total whenever cartItems change
    if (Array.isArray(cartItems)) {
      const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalAmount(newTotal);
    }
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedItems = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = (itemId) => {
    try {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const handlePlaceOrder = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Navigate to payment page instead of directly placing order
      navigate('/payment', { 
        state: { 
          cartItems,
          totalAmount 
        } 
      });
    } catch (err) {
      setError('Failed to proceed to payment');
      console.error('Error proceeding to payment:', err);
    }
  };

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="cart-error">{error}</div>;
  }

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
                <Link className="nav-link text-dark" to="/cart" style={{ fontSize: '0.9rem' }}>
                  <FaShoppingCart className="me-1" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/orderSummary" style={{ fontSize: '0.9rem' }}>
                  <FaClipboardList className="me-1" /> Order Summary
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
                  <li><Link className="dropdown-item" to="/signIn">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">CART</h2>
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
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
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
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleRemoveItem(item.id)}
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
                  <h4 className="mb-0 text-dark">₹{totalAmount}</h4>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <button onClick={handlePlaceOrder} className="btn btn-warning fw-bold">Place Order</button>
                  <Link to="/orderSummary" className="btn btn-warning fw-bold">Take Away</Link>
                  <Link to="/reserveTable" className="btn btn-warning fw-bold">Reserve Table</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
