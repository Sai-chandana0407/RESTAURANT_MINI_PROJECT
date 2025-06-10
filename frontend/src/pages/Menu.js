import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaUserCircle, FaPlus, FaMinus, FaShoppingCart, FaHome, FaUtensils, FaPhone, FaInfoCircle, FaUser, FaStar, FaClipboardList, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const menuItems = [
  { id: 1, name: "Omlette", price: 120, category: "Breakfast", image: "/img/omlette.jpeg" },
  { id: 2, name: "North Indian", price: 250, category: "Main course", image: "/img/panner.jpeg" },
  { id: 3, name: "Coffee", price: 80, category: "Drinks", image: "/img/coffee.jpeg" },
  { id: 4, name: "Cake", price: 150, category: "Deserts and Sweets", image: "/img/cake.jpeg" },
  { id: 5, name: "Chicken", price: 300, category: "Main course", image: "/img/chicken.jpeg" },
  { id: 6, name: "Idli", price: 100, category: "Breakfast", image: "/img/idli.jpeg" },
  { id: 7, name: "Noodles", price: 180, category: "Asian", image: "/img/noodles.jpeg" },
];

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemCounts, setItemCounts] = useState({});
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (location.state) {
      if (location.state.searchQuery) {
        setSearchQuery(location.state.searchQuery);
      }
      if (location.state.category) {
        setSelectedCategory(location.state.category);
      }
      if (location.state.cartItems) {
        setCartItems(location.state.cartItems);
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
  }, [searchQuery, selectedCategory]);

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
    const count = itemCounts[item.id] || 0;
    if (count > 0) {
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity = count;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...item, quantity: count }]);
      }
      
      setItemCounts(prev => {
        const newCounts = { ...prev };
        delete newCounts[item.id];
        return newCounts;
      });
    }
  };

  const addToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      cartItems.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart', { state: { cartItems: [{ ...item, quantity: 1 }] } });
  };

  const handleViewCart = () => {
    navigate('/cart', { state: { cartItems } });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{  minHeight: '100vh' }}>
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
                <Link className="nav-link text-white" to="/about" style={{ fontSize: '0.9rem' }}>
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
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center py-2" to="/" style={{ color: '#ff4444' }}>
                      <FaSignOutAlt className="me-2" />
                      <span>Logout</span>
                    </Link>
                  </li>
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
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100" style={{ backgroundColor: '#333', border: '1px solid #444' }}>
                <img src={item.image} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title text-white">{item.name}</h5>
                  <p className="card-text text-white">₹{item.price}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleDecrement(item.id)}
                        disabled={!itemCounts[item.id]}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 text-white" style={{ 
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}>
                        {itemCounts[item.id] || 0}
                      </span>
                      <button 
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => handleIncrement(item.id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button 
                      className="btn btn-warning"
                      onClick={() => addToCart(item)}
                      disabled={!itemCounts[item.id]}
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
