import React from 'react'
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
function SignUp() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('./img/img4.jpg') no-repeat center center/cover`,
        height: "100vh",
        width: "100%",
      }}
    >
      <h2 className="text-white mb-3">SIGN UP</h2>

      <div className="signup-container p-4 bg-light shadow rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <form>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input type="tel" className="form-control" placeholder="Enter your phone number" />
          </div>
          <Link to="/homePage" className="btn btn-warning w-100 fw-bold">Sign Up</Link>
        </form>
      </div>

      {/* Social Icons */}
      <div className="social-icons w-100 text-center py-3 mt-4 ">
        <FaGoogle className="text-white mx-3 fs-4" />
        <FaFacebookF className="text-white mx-3 fs-4" />
        <FaInstagram className="text-white mx-3 fs-4" />
        <FaTwitter className="text-white mx-3 fs-4" />
      </div>
    </div>
  )
}

export default SignUp;