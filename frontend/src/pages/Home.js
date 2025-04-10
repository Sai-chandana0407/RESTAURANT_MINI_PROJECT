import react from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {Link} from 'react-router-dom';

function Home() {
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
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
    getStartedBtn: {
      padding: "1rem 2rem",
      fontSize: "1.2rem",
      fontWeight: "bold",
      backgroundColor: "#ffc107",
      border: "none",
      borderRadius: "5px",
      color: "#000",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    getStartedBtnHover: {
      backgroundColor: "#ffca2c",
      transform: "scale(1.05)",
    },
    footer: {
      backgroundColor: "#343a40",
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
    socialIcon: { margin: "0 10px", fontSize: "20px", color: "white",textDecoration:"none" },
  };

  return (
    <div>
      {/* Header Section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand d-flex align-items-center " href="/img/img1.jpg">
          <img src={'/img/logoimg.jpg'} alt="Logo" style={styles.logo} />Homely Bites
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="/signIn">Sign In</a></li>
            <li className="nav-item"><a className="nav-link" href="/signUp">Sign Up</a></li>
            <li className="nav-item"><a className="nav-link" href="/stafflogin">Staff Login</a></li>
            <li className="nav-item"><a className="nav-link" href="/ownerlogin">Owner Login</a></li>
            <li className="nav-item"><a className="nav-link" href="/contactUs">Contact Us</a></li>
          </ul>
        </div>
      </nav>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.overlay}>
          <h1 style={{...styles.textWhite, ...styles.title}}>Taste and Treat</h1>
          <p style={{...styles.textWhite, ...styles.subtitle}}>Experience the finest dining with us</p>
          <Link 
            to="/signin" 
            className="btn btn-warning"
            style={styles.getStartedBtn}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>© 2025 Homely Bites. All Rights Reserved.</p>
        <div className="social-icons w-100 text-center py-3 mt-4 ">
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