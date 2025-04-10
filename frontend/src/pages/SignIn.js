import React from 'react'
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img2.jpg') no-repeat center center/cover`,
      }}
    >
      <h2 className="text-white mb-3">SIGN IN</h2>

      <div className="login-container p-4 bg-light shadow rounded" style={{ maxWidth: "400px", width: "100%" }}>
        <form>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">Sign In</button>
          
          <div className="text-center">
            <p className="mb-0">New User? <Link to="/signup" className="text-warning fw-bold">Sign up</Link> to create your account</p>
          </div>
        </form>
      </div>

      {/* Social Icons */}
      <div className="social-icons w-100 text-center py-3 mt-4">
        <a href="#" className="text-white mx-2"><FaGoogle /></a>
        <a href="#" className="text-white mx-2"><FaFacebookF /></a>
        <a href="#" className="text-white mx-2"><FaInstagram /></a>
        <a href="#" className="text-white mx-2"><FaTwitter /></a>
      </div>
    </div>
  );
}

export default SignIn;
