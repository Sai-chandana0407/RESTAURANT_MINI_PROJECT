import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';

function OrderSummary() {
  const location = useLocation();
  const [tablePrice, setTablePrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(100); // Default delivery charges
  const [showTable, setShowTable] = useState(false);

  // Get cart and total from location.state (dynamic)
  const cartItems = location.state?.cartItems || JSON.parse(localStorage.getItem('cart') || '[]');
  const itemsCost = location.state?.totalAmount || cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    // If coming from reserve table, show table price
    if (location.state?.tablePrice) {
      setTablePrice(Number(location.state.tablePrice));
      setShowTable(true);
    } else {
      setTablePrice(0);
      setShowTable(false);
    }
  }, [location.state]);

  const calculateTotal = () => {
    return tablePrice + itemsCost + deliveryCharges;
  };

  return (
    <div
      className="order-summary-bg d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <div className="container py-5 d-flex justify-content-center align-items-center">
        <div className="card p-4 shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <h5 className="mb-3 fw-bold" style={{ color: '#000' }}>Homely Bites</h5>
          <h6 className="fw-bold" style={{ color: '#000' }}>Order Summary</h6>
          {showTable && tablePrice > 0 && (
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
          {/* Show only delivery and items cost if not table, else show table too */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            {!showTable && (
              <Link
                to="/reserveTable"
                state={{ cartItems, totalAmount: itemsCost, tablePrice: 200 }}
                className="btn btn-warning fw-bold"
              >
                Reserve Table
              </Link>
            )}
            <Link to="/payment" className="btn btn-success fw-bold mx-2">Proceed to Pay</Link>
            {showTable && (
              <Link
                to="/orderSummary"
                replace
                state={{ cartItems, totalAmount: itemsCost }}
                className="btn btn-outline-secondary fw-bold"
                style={{ marginLeft: '10px' }}
              >
                Back to Summary
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
