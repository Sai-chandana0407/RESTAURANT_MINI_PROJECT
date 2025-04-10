import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  return (
    <div
      style={{
        background: "url('/img/forgot1.jpg') no-repeat center center/cover",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
      }}
    >
      {/* Right section with form */}
      <div className=" d-flex align-items-center justify-content-center bg-light">
        <div className="p-4 shadow-sm rounded bg-white" style={{ minWidth: '300px' }}>
          <h6 className="mb-3">Email</h6>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter"
          />
          <div className="d-flex justify-content-between">
            <button className="btn btn-link">Cancel</button>
            <button className="btn btn-dark">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;