import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaUserCircle, FaPlus, FaMinus, FaShoppingCart, FaHome, FaUtensils, FaPhone, FaInfoCircle, FaUser, FaStar, FaClipboardList, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemCounts, setItemCounts] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (location.state) {
      if (location.state.searchQuery) {
        setSearchQuery(location.state.searchQuery);
      }
      if (location.state.category) {
        setSelectedCategory(location.state.category);
      }
    }
  }, [location]);

  useEffect(() => {
    let filtered = menuItems;
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(item =>
        item.category === selectedCategory
      );
    }
    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, menuItems]);

  const handleIncrement = (itemId) => {
    setItemCounts(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecrement = (itemId) => {
    setItemCounts(prev => {
      const newCount = (prev[itemId] || 0) - 1;
      if (newCount <= 0) {
        const newCounts = { ...prev };
        delete newCounts[itemId];
        return newCounts;
      }
      return {
        ...prev,
        [itemId]: newCount
      };
    });
  };

  const handleAddToCart = (item) => {
    const count = itemCounts[item._id] || 0;
    if (count > 0) {
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity = count;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...item, quantity: count }]);
      }
      
      setItemCounts(prev => {
        const newCounts = { ...prev };
        delete newCounts[item._id];
        return newCounts;
      });
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm" style={{ height: '50px' }}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ height: '40px' }}>
            <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="30" height="30" className="rounded-circle me-2" />
            <span className="text-white" style={{ fontSize: '1rem' }}>Homely Bites</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/homePage" style={{ fontSize: '0.9rem' }}>
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/menu" style={{ fontSize: '0.9rem' }}>
                  <FaUtensils className="me-1" /> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart" style={{ fontSize: '0.9rem' }}>
                  <FaShoppingCart className="me-1" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/orderSummary" style={{ fontSize: '0.9rem' }}>
                  <FaClipboardList className="me-1" /> Order Summary
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contactUs" style={{ fontSize: '0.9rem' }}>
                  <FaPhone className="me-1" /> Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about" style={{ fontSize: '0.9rem' }}>
                  <FaInfoCircle className="me-1" /> About
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button 
                className="btn btn-warning position-relative me-3"
                onClick={handleViewCart}
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
              >
                <FaShoppingCart className="text-dark" />
                {getTotalItems() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <div className="dropdown">
                <button 
                  className="btn btn-link dropdown-toggle d-flex align-items-center justify-content-center" 
                  type="button" 
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ 
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    backgroundColor: 'transparent'
                  }}
                >
                  <FaUserCircle size={24} className="text-white" />
                </button>
                
                <ul 
                  className="dropdown-menu dropdown-menu-end p-3" 
                  aria-labelledby="userDropdown"
                  style={{ 
                    minWidth: '250px',
                    border: '1px solid #fff',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#000'
                  }}
                >
                  <li className="d-flex align-items-center mb-3">
                    <FaUserCircle size={40} className="text-white me-2" />
                    <div>
                      <h6 className="mb-0 text-white">John Doe</h6>
                    </div>
                  </li>
                  <li><Link className="dropdown-item text-white" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item text-white" to="/orders">Orders</Link></li>
                  <li><hr className="dropdown-divider bg-white" /></li>
                  <li><Link className="dropdown-item text-white" to="/signIn">Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search for food item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: '#333', color: '#fff', border: '1px solid #444' }}
          />
          <button className="btn btn-dark border ms-2">
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mt-4">
        <div className="row">
          {filteredItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: '#333', border: '1px solid #444' }}>
                <img src={item.image} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title text-white">{item.name}</h5>
                  <p className="card-text text-white">₹{item.price}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleDecrement(item._id)}
                        disabled={!itemCounts[item._id]}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-white" style={{ 
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {itemCounts[item._id] || 0}
                      </span>
                      <button 
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => handleIncrement(item._id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button 
                      className="btn btn-warning"
                      onClick={() => handleAddToCart(item)}
                      disabled={!itemCounts[item._id]}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
