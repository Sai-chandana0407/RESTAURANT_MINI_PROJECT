import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyOTP.css';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const phoneNumber = localStorage.getItem('phoneNumber');
      if (!phoneNumber) {
        setError('Phone number not found. Please try again.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phoneNumber,
        otp
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Clear phone number from storage
        localStorage.removeItem('phoneNumber');
        // Redirect to menu page
        navigate('/menu');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <h2 className="verify-otp-title">Verify OTP</h2>
        <p className="text-white text-center mb-4">
          Please enter the OTP sent to your phone number
        </p>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP; 