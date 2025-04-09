import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
const menuItems = [
  { category: "Breakfast", name: "Idli", price: 200, image: "/img/idli.jpeg" },
  { category: "Brunch", name: "Chocolate Cake (1 kg)", price: 200, image: "/img/cake.jpeg" },
  { category: "Breakfast", name: "Pav Bhaji", price: 100, image: "/img/pavbhaji.jpeg" },
  { category: "Brunch", name: "Pizza", price: 150, image: "/img/pizza.jpeg" },
  { category: "Lunch", name: "Panner", price: 200, image: "/img/panner.jpeg" },
  { category: "Brunch", name: "Noodles", price: 200, image: "/img/noodles.jpeg" },
  { category: "Breakfast", name: "Puri", price: 200, image: "/img/puri.jpeg" },
  { category: "Breakfast", name: "Bonda", price: 200, image: "/img/bonda.jpeg" },
  { category: "Brunch", name: "Omlette", price: 200, image: "/img/omlette.jpeg" },
  { category: "Breakfast", name: "Dosa", price: 200, image: "/img/dosa.jpeg" },
  { category: "Brunch", name: "Paasta", price: 200, image: "/img/paasta.jpeg" },
  { category: "Lunch", name: "Chicken", price: 200, image: "/img/chicken.jpeg" },
  { category: "Breakfast", name: "Upma", price: 200, image: "/img/upma.jpeg" },
  { category: "Breakfast", name: "Utappam", price: 200, image: "/img/utappam.jpeg" },
];

const MenuPage = () => {
  return (
    <div className="container my-5">
      {/* Logo and Title */}
      <div className="d-flex align-items-center my-3">
        <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="50" height="50" className="rounded-circle me-2" />
        <h2 className="fw-bold">Homely Bites</h2>
      </div>
    
      {/* Main Menu Heading */}
      <h2 className="text-center my-4 fw-bold">MAIN MENU PAGE</h2>
      <div className="text-center my-4">
      <Link to="/searchMenu" className="btn btn-warning w-10 fw-bold mx-2">Search</Link>
      <Link to="/cart" className="btn btn-warning w-22 fw-bold mx-2">Cart</Link>
      </div>
            
      {/* Menu Grid */}
      <div className="row">
        {menuItems.map((item,index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <h5 className="fw-bold text-muted">{item.category}</h5>
              <img src={item.image} alt={item.name} className="img-fluid mx-auto d-block" style={{ height: "120px", objectFit: "cover" }} />
              <h5 className="mt-2 text-center">{item.name}</h5>
              <p className="text-center fw-bold">Rs. {item.price}</p>
              <button className="btn btn-success w-100">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
