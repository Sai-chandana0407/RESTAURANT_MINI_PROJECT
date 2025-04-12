import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaBriefcase } from 'react-icons/fa';
import './AdminProfileUpdate.css';

const AdminProfileUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phoneNumber: '',
    address: '',
    position: 'Admin'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      const ageValue = value.replace(/\D/g, '').slice(0, 2);
      setFormData(prev => ({ ...prev, [name]: ageValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const age = parseInt(formData.age);
      if (age < 18 || age > 100) {
        setError('Age must be between 18 and 100');
        setLoading(false);
        return;
      }

      const response = await axios.put('/api/admin/profile', formData);
      if (response.data.success) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-profile-update">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Update Admin Profile</h2>
          <p className="text-muted">Please update your profile information below</p>
        </div>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <FaUser className="input-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaBirthdayCake className="input-icon" />
              Age
            </label>
            <div className="age-input-container">
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control age-input"
                placeholder="Enter age"
                required
                pattern="[0-9]*"
                inputMode="numeric"
              />
              <span className="age-suffix">years</span>
            </div>
            <small className="age-hint">Must be between 18 and 100 years</small>
          </div>

          <div className="form-group">
            <label>
              <FaPhone className="input-icon" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="input-icon" />
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaBriefcase className="input-icon" />
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              className="form-control"
              disabled
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileUpdate; 