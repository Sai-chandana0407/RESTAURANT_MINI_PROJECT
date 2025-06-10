import React from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function HomePage() {
  return (
    <div
      style={{
        background: "url('/img/img1.jpg') no-repeat center center/cover",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark  fixed-top">
        <div className="container-fluid">
          {/* Logo & Name (Aligned to Top Left) */}
          <a className="navbar-brand d-flex align-items-center" href="/" style={{ position: "absolute", top: "10px", left: "10px" }}>
            <img
              src="/img/logoimg.jpg"
              alt="Homely Bites Logo"
              className="rounded-circle"
              width="45"
              height="45"
            />
            <span className="ms-2 fw-bold text-white">Homely Bites</span>
          </a>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/menu">Menu</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/cart">Cart</Link></li>
            
            <li className="nav-item"><Link className="nav-link text-white" to="/orderSummary">Order Summary</Link></li>
            <Link to="/" className="nav-link d-inline mx-1 text-white">Sign Out</Link>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-white fw-bold">HOMELY BITES</h1>
        <h3 className="text-white">WHERE EVERY BITE FEELS LIKE HOME</h3>

        {/* Buttons */}
        <div className="mt-4">
          <Link to="/about" className="btn btn-warning fw-bold mx-2">Explore</Link>
          <Link to="/menu" className="btn btn-warning fw-bold mx-2">View Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
