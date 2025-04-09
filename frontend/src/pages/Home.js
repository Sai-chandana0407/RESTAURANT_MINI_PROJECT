import react from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {Link} from 'react-router-dom';
function Home ()
{
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
              // backgroundColor: "rgba(0, 0, 0, 0.5)",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
            textWhite: { color:"#ffffff" },
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
                  <h1 style={styles.textWhite}>HOMELY BITES</h1>
                  <h3 style={styles.textWhite}>WHERE EVERY BITE FEELS LIKE HOME</h3>
                  <div className="mt-3">
                      <Link to="/about" className="btn btn-warning w-100 fw-bold">Explore</Link>
                  </div>
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
        
    )

}
export default Home;