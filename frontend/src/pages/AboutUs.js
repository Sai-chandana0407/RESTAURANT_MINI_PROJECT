import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  const navigate = useNavigate();
  const styles = {
    body: {
      fontFamily: "'Pilcrow Rounded', 'Archivo', sans-serif",
      background: "url('/img/aboutimg.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      color: "white",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      position: "relative",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.3)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      padding: "20px",
    },
    navbar: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "10px 20px",
      position: "relative",
      zIndex: 3,
    },
    logo: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "10px",
    },
    aboutSection: {
      textAlign: "center",
      padding: "50px 20px",
      margin: "20px",
      borderRadius: "10px",
      minHeight: "calc(100vh - 80px)",
    },
    aboutTitle: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "30px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      letterSpacing: "2px",
      color: "white",
    },
    aboutText: {
      fontSize: "1.5rem",
      maxWidth: "850px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
      color: "white",
    },
    offerTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: "40px 0 20px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      color: "white",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      margin: "30px 0",
      flexWrap: "wrap",
    },
    button: {
      fontWeight: "bold",
      padding: "12px 25px",
      backgroundColor: "#e65c00",
      border: "none",
      color: "white",
      borderRadius: "30px",
      fontSize: "1.1rem",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#ff8000",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
    },
    missionSection: {
      fontSize: "1.3rem",
      maxWidth: "800px",
      margin: "40px auto 0",
      lineHeight: "1.6",
      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
      color: "white",
    },
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.body}>
      <div style={styles.overlay}></div>
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/img/logoimg.jpg" alt="Logo" style={styles.logo} />
          <span style={{ color: "white" }}>Homely Bites</span>
        </Link>
      </nav>

      {/* About Section */}
      <div style={styles.content}>
        <div style={styles.aboutSection}>
          <h2 style={styles.aboutTitle}>ABOUT US</h2>
          <p style={styles.aboutText}>
            <strong>Homely Bites</strong> blends delicious food with seamless experiences.
            From browsing digital menus to reserving your table, we make dining smarter and simpler.
          </p>

          <h3 style={styles.offerTitle}>What We Offer</h3>
          <div style={styles.buttonGroup}>
            <button 
              className="btn" 
              style={styles.button}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ff8000"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e65c00"}
              onClick={() => handleNavigation('/menu')}
            >
              Explore Menu
            </button>
            <button 
              className="btn" 
              style={styles.button}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ff8000"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e65c00"}
              onClick={() => handleNavigation('/reserveTable')}
            >
              Reserve Table
            </button>
          </div>

          <p style={styles.missionSection}>
            Our mission is to provide an exceptional dining experience through innovative technology
            and outstanding service. We believe in creating memorable moments for our guests while
            maintaining the highest standards of quality and hospitality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
