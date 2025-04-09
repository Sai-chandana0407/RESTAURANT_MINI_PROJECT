import React from 'react'
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
function ContactUs() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img3.webp') no-repeat center center/cover`,
      }}
    >
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Top Left Logo & Brand Name */}
      <div className="position-absolute top-0 start-0 mt-3 ms-3 d-flex align-items-center">
        <img 
          src="./img/logoimg.jpg" // Replace with actual logo URL
          alt="Logo" 
          className="rounded-circle me-2" 
          width="45" 
          height="45" 
        />
        <h3 className="fw-bold mb-0">Homely Bites</h3>
      </div>
    
          {/* Contact Form */}
          <h2 className="mt-3 mb-4" style={{ fontFamily: "cursive" }}>CONTACT US</h2>
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <input type="text" className="form-control p-3" placeholder="Enter your Name" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control p-3" placeholder="Enter a valid Email address" />
              </div>
              <div className="mb-3">
                <textarea className="form-control p-3" rows="4" placeholder="Message"></textarea>
              </div>
              <button type="submit" className="btn btn-warning w-100 fw-bold">Send</button>
            </form>
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
      </div>
  )
}

export default ContactUs;