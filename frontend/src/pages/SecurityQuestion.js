import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SecurityQuestion = () => {
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
      {/* Right Form Section */}
      <div className=" d-flex align-items-center justify-content-center bg-light">
        <div className="p-4 bg-white rounded shadow-sm" style={{ minWidth: '300px' }}>
          <label className="form-label">
          Name the first tourist place you visited ?
          </label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter"
          />
          <button className="btn btn-dark w-100">SUBMIT</button>
        </div>
    </div>
    </div>
  );
};

export default SecurityQuestion;