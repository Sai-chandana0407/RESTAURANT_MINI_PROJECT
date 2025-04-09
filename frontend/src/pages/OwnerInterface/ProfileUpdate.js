import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./ProfileUpdate.css"; // Custom styles

const ProfileUpdate = () => {
  return (
    <div className="container mt-4">
      {/* Restaurant Logo */}
      <div className="text-center mb-3">
        <img src="/images/logo.png" alt="Homely Bites" className="img-fluid logo" />
      </div>

      {/* Title */}
      <h2 className="text-center text-uppercase fw-bold">Employee Profile</h2>

      {/* Profile Section */}
      <div className="card shadow mt-4 p-4">
        <div className="row g-4">
          {/* Profile Image */}
          <div className="col-md-3 text-center">
            <div className="profile-image d-flex align-items-center justify-content-center">
              <span className="display-4">👤</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-md-9">
            <div className="row">
              {[
                "Full Name",
                "Job Title",
                "Email",
                "Education",
                "Training",
                "Experience",
                "Expertise",
                "Passion",
                "Hobbies",
                "Contact Information",
              ].map((label, index) => (
                <div className="col-12 col-md-6 mb-3" key={index}>
                  <label className="fw-bold">{label}:</label>
                  <input type="text" className="form-control" value="Value" readOnly />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;