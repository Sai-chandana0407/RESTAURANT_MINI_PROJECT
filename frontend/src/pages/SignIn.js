import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        throw new Error('All fields are required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Make API call to login
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to menu page
        navigate('/menu');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-title">SIGN IN</h2>

        <div className="form-container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-warning">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold mb-3"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="text-center">
              <p className="mb-0 text-white">New User? <Link to="/signup" className="text-warning fw-bold">Sign up</Link> to create your account</p>
            </div>
          </form>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" className="social-icon"><FaGoogle /></a>
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
