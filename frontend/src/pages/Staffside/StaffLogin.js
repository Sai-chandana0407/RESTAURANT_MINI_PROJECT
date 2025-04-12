import React, { useState } from "react";
import "./StaffLogin.css"; // Importing the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/staff/login', formData);
      
      // Store token and staff data in localStorage
      localStorage.setItem('staffToken', response.data.token);
      localStorage.setItem('staffData', JSON.stringify(response.data.staff));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">STAFF LOGIN</header>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input 
            type="text" 
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID" 
            required
            style={{ color: 'black' }}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            required
            style={{ color: 'black' }}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-warning w-10 fw-bold mx-2 my-4"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
};

export default StaffLogin;