import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log({ rating, review });
    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <div className="container py-4">
      {/* Logo and Title */}
      <div className="d-flex align-items-center mb-4">
        <img 
          src="/img/logoimg.jpg" 
          alt="Homely Bites Logo" 
          width="50" 
          height="50" 
          className="rounded-circle me-2" 
        />
        <h2 className="fw-bold mb-0">Homely Bites</h2>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">FEEDBACK</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold">Rate us</label>
              <div className="d-flex">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      className={starValue <= (hover || rating) ? 'text-warning' : 'text-secondary'}
                      style={{ fontSize: '2rem', cursor: 'pointer' }}
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
                placeholder="Share your experience with us..."
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;