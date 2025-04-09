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
          <div className="ms-auto">
            <Link to="/" className="nav-link d-inline mx-1 text-white">Sign Out</Link>
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

      {/* Footer */}
      <footer 
        className="text-center py-3"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          margin: "0 10px", fontSize: "20px", color: "white",textDecoration:"none" ,
          }
        }
      >
        <FaGoogle className="text-white mx-3 fs-4" />
        <FaFacebookF className="text-white mx-3 fs-4" />
        <FaInstagram className="text-white mx-3 fs-4" />
        <FaTwitter className="text-white mx-3 fs-4" />
      </footer>
    </div>
  );
};

export default HomePage;
