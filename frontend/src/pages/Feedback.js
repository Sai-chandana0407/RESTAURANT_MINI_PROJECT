import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div style={{ backgroundColor: '#cdddbc', minHeight: '100vh' }}>
      {/* Logo and Title */}
      <div className="d-flex align-items-center my-6">
        <img src="/img/logoimg.jpg" alt="Homely Bites Logo" width="50" height="50" className="rounded-circle me-2" />
        <h2 className="fw-bold mt-2">Homely Bites</h2>
      </div>
      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ fontFamily: 'cursive' }}>FEEDBACK</h2>

        <div className="mb-4">
          <label className="fw-bold" style={{ fontFamily: 'cursive', fontSize: '20px' }}>
            Rate us
          </label>
          <div className="d-flex align-items-center mt-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <i
                  key={i}
                  className={bi ${starValue <= (hover || rating) ? 'bi-star-fill' : 'bi-star'} mx-1}
                  style={{ fontSize: '2rem', color: '#fff', cursor: 'pointer' }}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Review:</label>
          <textarea
            className="form-control"
            placeholder="Enter"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;