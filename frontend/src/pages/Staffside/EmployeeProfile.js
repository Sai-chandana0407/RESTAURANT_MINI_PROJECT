import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./EmployeeProfile.css"; // Importing the CSS file

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state?.employee;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee || {
    name: 'John Doe',
    position: 'Senior Chef',
    email: 'john.doe@homelybites.com',
    education: 'Culinary Arts Degree',
    training: 'Advanced Cooking Techniques',
    experience: '5 years in fine dining',
    expertise: 'Italian and French Cuisine',
    passion: 'Creating innovative dishes',
    hobbies: 'Food photography, Travel',
    contact: '+1 234-567-8900'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData(employee || {
      name: 'John Doe',
      position: 'Senior Chef',
      email: 'john.doe@homelybites.com',
      education: 'Culinary Arts Degree',
      training: 'Advanced Cooking Techniques',
      experience: '5 years in fine dining',
      expertise: 'Italian and French Cuisine',
      passion: 'Creating innovative dishes',
      hobbies: 'Food photography, Travel',
      contact: '+1 234-567-8900'
    });
  };

  return (
    <div className="profile-container">
      <header className="profile-header">EMPLOYEE PROFILE</header>
      <div className="profile-content">
        <div className="profile-image">
          <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Profile" />
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Training</label>
            <input
              type="text"
              name="training"
              value={formData.training}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Expertise</label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Passion</label>
            <input
              type="text"
              name="passion"
              value={formData.passion}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      <div className="profile-actions">
        {!isEditing ? (
          <button className="btn-update" onClick={() => setIsEditing(true)}>
            Update Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;