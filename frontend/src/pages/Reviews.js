import React, { useState, useEffect } from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaUtensils, FaSmile, FaHeart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reviews.css';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      _id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'Amazing food and great service! The ambiance is perfect for a family dinner. The staff was very attentive and the food was delicious. Will definitely come back again!',
      date: '2024-03-15'
    },
    {
      _id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Delicious food and friendly staff. The pasta was cooked to perfection and the dessert was heavenly. The only reason I\'m not giving 5 stars is because the wait time was a bit long.',
      date: '2024-03-10'
    },
    {
      _id: 3,
      name: 'Michael Johnson',
      rating: 5,
      comment: 'Best restaurant in town! The steak was perfectly cooked, and the wine selection was excellent. The service was impeccable, and the atmosphere was cozy and inviting.',
      date: '2024-03-05'
    },
    {
      _id: 4,
      name: 'Sarah Williams',
      rating: 5,
      comment: 'Absolutely loved the experience! The chef\'s special was outstanding, and the presentation was beautiful. The staff made us feel very welcome and the prices were reasonable.',
      date: '2024-02-28'
    },
    {
      _id: 5,
      name: 'David Brown',
      rating: 4,
      comment: 'Great place for a business lunch. The food was excellent, and the service was professional. The only suggestion would be to have more vegetarian options on the menu.',
      date: '2024-02-20'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      _id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 0, comment: '' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="row">
          {/* Review Form */}
          <div className="col-md-4">
            <div className="review-form-container">
              <h2 className="section-title">Write a Review</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`star ${index < newReview.rating ? 'filled' : ''}`}
                        onClick={() => handleRatingChange(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Your Review</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    className="form-control"
                    rows="4"
                    placeholder="Share your experience with us..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="col-md-8">
            <div className="reviews-list">
              <h2 className="section-title">Customer Reviews</h2>
              <div className="review-stats">
                <div className="stat-item">
                  <FaUtensils className="stat-icon" />
                  <span className="stat-value">{reviews.length}</span>
                  <span className="stat-label">Total Reviews</span>
                </div>
                <div className="stat-item">
                  <FaSmile className="stat-icon" />
                  <span className="stat-value">
                    {Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length * 10) / 10}
                  </span>
                  <span className="stat-label">Average Rating</span>
                </div>
                <div className="stat-item">
                  <FaHeart className="stat-icon" />
                  <span className="stat-value">
                    {reviews.filter(review => review.rating === 5).length}
                  </span>
                  <span className="stat-label">5-Star Reviews</span>
                </div>
              </div>
              {reviews.map(review => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <FaUser className="user-icon" />
                      <span className="reviewer-name">{review.name}</span>
                    </div>
                    <div className="review-date">
                      <FaCalendarAlt className="calendar-icon" />
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews; 