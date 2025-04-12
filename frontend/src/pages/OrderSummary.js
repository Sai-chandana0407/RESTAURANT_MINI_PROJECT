import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';

function OrderSummary() {
  const location = useLocation();
  const [tablePrice, setTablePrice] = useState(0);
  const [itemsCost, setItemsCost] = useState(340); // Default items cost
  const [deliveryCharges, setDeliveryCharges] = useState(100); // Default delivery charges

  useEffect(() => {
    // Get table price from location state or localStorage
    const price = location.state?.tablePrice || localStorage.getItem('tablePrice') || 0;
    setTablePrice(Number(price));
  }, [location.state]);

  const calculateTotal = () => {
    return tablePrice + itemsCost + deliveryCharges;
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img7.jpg') no-repeat center center/cover`,
      }}
    >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <h5 className="mb-3 fw-bold" style={{ color: '#000' }}>Homely Bites</h5>
          <h6 className="fw-bold" style={{ color: '#000' }}>Order Summary</h6>
          
          {tablePrice > 0 && (
            <div className="mb-2 d-flex justify-content-between">
              <span style={{ color: '#000' }}><em>Table Reservation</em></span>
              <span style={{ color: '#000' }}>₹{tablePrice}</span>
            </div>
          )}
          
          <div className="mb-2 d-flex justify-content-between">
            <span style={{ color: '#000' }}><em>Total items cost</em></span>
            <span style={{ color: '#000' }}>₹{itemsCost}</span>
          </div>
          
          <div className="mb-2 d-flex justify-content-between">
            <span style={{ color: '#000' }}><em>Delivery Charges</em></span>
            <span style={{ color: '#000' }}>₹{deliveryCharges}</span>
          </div>
          
          <hr style={{ borderColor: '#000' }} />
          
          <div className="mb-3 d-flex justify-content-between">
            <span style={{ color: '#000' }}><strong>Order total:</strong></span>
            <span style={{ color: '#000' }}><strong>₹{calculateTotal()}</strong></span>
          </div>
          
          <Link to="/payment" className="btn btn-warning fw-bold mx-2">Proceed to pay</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
