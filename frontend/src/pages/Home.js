import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    heroSection: {
      background: "url('/img/img1.jpg') no-repeat center center/cover",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    overlay: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    textWhite: {
      color: "#ffffff",
      marginBottom: "2rem",
    },
    title: {
      fontFamily: "'Pilcrow Rounded', 'Archivo', sans-serif",
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
    getStartedBtn: {
      width: "200px",
      height: "50px",
      background: isHovered ? "#ffca2c" : "#e65c00",
      borderRadius: "100px",
      padding: "1rem 2rem",
      fontSize: "1.2rem",
      fontWeight: "bold",
      border: "none",
      color: "white",
      textDecoration: "none",
      transition: "all 0.3s ease",
      transform: isHovered ? "scale(1.05)" : "scale(1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
    },
    footer: {
      backgroundColor: "#000000",
      color: "#fff",
      textAlign: "center",
      padding: "15px 0",
    },
    logo: {
      height: "40px",
      width: "40px",
      marginRight: "10px",
      borderRadius: "50%",
      objectFit: "cover",
    },
  };

  return (
    <div>
      {/* Header Section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={'/img/logoimg.jpg'} alt="Logo" style={styles.logo} /> Homely Bites
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/menu">Menu</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/cart">Cart</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/orderSummary">Order Summary</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/contactUs">Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/reviews">Reviews</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/signIn">Sign In</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/adminlogin">Admin</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/staffLogin">Staff</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.overlay}>
          <h1 style={{ ...styles.textWhite, ...styles.title }}>Taste and Treat</h1>
          <p style={{ ...styles.textWhite, ...styles.subtitle }}>
            Experience the finest dining with us
          </p>
          <Link
            to="/signin"
            style={styles.getStartedBtn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>© 2025 Homely Bites. All Rights Reserved.</p>
        <div className="social-icons w-100 text-center py-3 mt-4">
          <FaGoogle className="text-white mx-3 fs-4" />
          <FaFacebookF className="text-white mx-3 fs-4" />
          <FaInstagram className="text-white mx-3 fs-4" />
          <FaTwitter className="text-white mx-3 fs-4" />
        </div>
      </footer>
    </div>
  );
}

export default Home;
