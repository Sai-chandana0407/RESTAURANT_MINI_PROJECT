import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function PaymentForm ()  {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [showCredits, setShowCredits] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [cardError, setCardError] = useState('');

  const handleCardInput = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    setCardError('');
  };

  const handlePayNow = () => {
    if (paymentMethod === "Credit Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setCardError('Please fill all credit card details.');
        setPaymentSuccess(false);
        return;
      }
    }
    setCardError('');
    setPaymentSuccess(true);
  };

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

        {paymentMethod === "Credit Card" && (
          <div className="text-center">
            <div className="mb-2">
              <label>Enter the card number:</label>
              <input type="text" className="form-control" name="number" value={cardDetails.number} onChange={handleCardInput} />
            </div>
            <div className="mb-2">
              <label>Expiration date:</label>
              <input type="text" className="form-control" name="expiry" value={cardDetails.expiry} onChange={handleCardInput} />
            </div>
            <div className="mb-2">
              <label>Security code:</label>
              <input type="text" className="form-control" name="cvv" value={cardDetails.cvv} onChange={handleCardInput} />
            </div>
            {cardError && <div className="alert alert-danger mt-2">{cardError}</div>}
          </div>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowCredits(true)}>Check your credits</button>
        </div>
        {showCredits && (
          <div className="alert alert-info text-center mt-3" style={{ fontSize: '1.2rem' }}>
            Your payment credits: <strong>₹1000</strong>
          </div>
        )}

        <div className="text-center mt-3">
          <button className="btn btn-success" onClick={handlePayNow}>Pay Now</button>
        </div>
        {paymentSuccess && (
          <div className="alert alert-success text-center mt-4" style={{ fontSize: '1.2rem' }}>
            <strong>Payment successful!</strong><br />
            Thank you for your order. Your payment has been received and your food is being prepared.<br />
            We appreciate your business and hope you enjoy your meal!
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
