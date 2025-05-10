import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function PaymentForm ()  {
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: `url('/img/img7.jpg') no-repeat center center/cover`,
      }}
    >
    <div className="container mt-5">
      <h2 className="text-center">Choose Payment Method</h2>
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-warning mx-2" onClick={() => setPaymentMethod("UPI")}>
          UPI
        </button>
        <button className="btn btn-warning mx-2" onClick={() => setPaymentMethod("Internet Banking")}>
          Internet Banking
        </button>
        <button className="btn btn-warning mx-2" onClick={() => setPaymentMethod("Credit Card")}>
          Credit Card
        </button>
      </div>

      {paymentMethod === "UPI" && (
        <div className="text-center">
          <p>Enter this UPI ID / scan the QR Code:</p>
          <img src="/img/scanner.jpeg" alt="QR Code" className="img-fluid" />
          <p>xyz@ybl</p>
        </div>
      )}

      {paymentMethod === "Internet Banking" && (
        <div className="text-center">
          <p>Choose a desired bank:</p>
          <button className="btn btn-outline-primary mx-2">SBI</button>
          <button className="btn btn-outline-primary mx-2">ICICI</button>
        </div>
      )}

      {paymentMethod === "Credit Card" && (
        <div className="text-center">
          <div className="mb-2">
            <label>Enter the card number:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-2">
            <label>Expiration date:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-2">
            <label>Security code:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary">Check your credits</button>
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success">Place Order</button>
      </div>
    </div>
    </div>
  );
};

export default PaymentForm;
