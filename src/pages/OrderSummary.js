import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function OrderSummary  ()  {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img7.jpg') no-repeat center center/cover`,
      }}
    >
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h5 className="mb-3 fw-bold">Homely Bites</h5>
        <h6 className="fw-bold">Order Summary</h6>
        <div className="mb-2 d-flex justify-content-between">
          <span><em>Table charges</em></span>
          <span>400</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span><em>Total items cost</em></span>
          <span>340</span>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span><em>Delivery Charges</em></span>
          <span>100</span>
        </div>
        <hr />
        <div className="mb-3 d-flex justify-content-between">
          <span><strong>Order total:</strong></span>
          <span><strong>440</strong></span>
        </div>
        <Link to="/payment" className="btn btn-warning fw-bold mx-2">Proceed to pay</Link>
      </div>
    </div>
    </div>
  );
};

export default OrderSummary;
