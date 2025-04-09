import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
function TimeSlot() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img7.jpg') no-repeat center center/cover`,
      }}
    >
    <div className="container d-flex flex-column align-items-center mt-5">
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <div className="d-flex align-items-center">
                <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="50" height="50" className="rounded-circle me-2" />
                <h4 className="fw-bold">Homely Bites</h4>
              </div>
            </div>
      <h5 className="mb-3 fst-italic">Choose time for the takeaway</h5>
      <input type="text" className="form-control mb-3 w-50" placeholder="Select time" />
      <Link to="/orderSummary" className="btn btn-warning fw-bold mx-2">Proceed to pay</Link>
    </div>
    </div>
  );
};

export default TimeSlot;
