import React from "react";
import "./EmployeeProfile.css"; // Importing the CSS file

const EmployeeProfile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">EMPLOYEE PROFILE</header>
      <div className="profile-content">
        <div className="profile-image">
          <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Profile" />
        </div>
        <div className="profile-details">
          {[
            "Full Name  ",
            "Job Title  ",
            "Email      ",
            "Education  ",
            "Training   ",
            "Experience ",
            "Expertise  ",
            "Passion    ",
            "Hobbies    ",
            "Contact Information",
          ].map((label, index) => (
            <div key={index} className="profile-field">
              <label>{label}</label>
              <input type="text" placeholder="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;