import React, { useState } from 'react';
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

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      if (response.data.token && response.data.user) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect based on user role
        if (response.data.user.role === 'staff') {
          navigate('/dashboard');
        } else {
          navigate('/menu');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
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
                minLength={6}
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
      </div>
    </div>
  );
}
export default SignIn;
