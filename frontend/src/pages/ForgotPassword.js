import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [receivedOTP, setReceivedOTP] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : cleaned;
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(formatPhoneNumber(value));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number starting with 6-9');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        phoneNumber: phoneNumber.replace(/\D/g, '')
      });

      if (response.data.success) {
        setStep(2);
        setCountdown(60);
        setCanResend(false);
        setReceivedOTP(response.data.otp);
        setError(`OTP sent: ${response.data.otp}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        phoneNumber: phoneNumber.replace(/\D/g, '')
      });

      if (response.data.success) {
        setCountdown(60);
        setCanResend(false);
        setReceivedOTP(response.data.otp);
        setError(`New OTP sent: ${response.data.otp}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        otp
      });

      if (response.data.success) {
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        newPassword
      });

      if (response.data.success) {
        window.location.href = '/signin';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Reset Password</h2>
        
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter your phone number (e.g., 987-654-3210)"
                required
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength="12"
              />
              <small className="format-hint">Format: XXX-XXX-XXXX (e.g., 987-654-3210)</small>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
                maxLength="6"
                pattern="[0-9]{6}"
              />
              <div className="otp-actions">
                <button 
                  type="button" 
                  onClick={handleResendOTP} 
                  disabled={!canResend || loading}
                  className="resend-btn"
                >
                  {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
                </button>
              </div>
              {receivedOTP && (
                <div className="otp-hint">
                  For testing: OTP is {receivedOTP}
                </div>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                minLength="6"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {error && <div className="error-message">{error}</div>}
        
        <div className="back-to-login">
          <Link to="/signin">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 