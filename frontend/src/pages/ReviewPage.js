import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange }) => (
  <div className="d-flex">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-warning' : 'text-secondary'}
        style={{ 
          cursor: onRatingChange ? 'pointer' : 'default',
          fontSize: '1.5rem',
          marginRight: '5px'
        }}
        onClick={() => onRatingChange && onRatingChange(i + 1)}
      />
    ))}
  </div>
);

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({
    title: '',
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reviews');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/reviews', newReview, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewReview({ title: '', rating: 0, comment: '' });
      fetchReviews();
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center mb-2">
            <img 
              src="/img/logoimg.jpg" 
              alt="Homely Bites"
              className="rounded-circle me-2"
              style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
            />
            <h5 className="mt-2 fw-bold">Homely Bites</h5>
          </div>
          <div className="fw-bold fs-5">
            Average Rating: <StarRating rating={4} />
          </div>
        </div>
        <div>
          <img
            src="/img/review1.webp"
            alt="Food Collage"
            style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="fw-bold">Reviews</h2>
        <p className="fst-italic">Leave us Feedback</p>
      </div>

      {/* Review Form */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={newReview.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating:</label>
              <StarRating rating={newReview.rating} onRatingChange={handleRatingChange} />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Your review"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                rows="3"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mt-4">
        {reviews.map((review, index) => (
          <div className="card mb-3 shadow-sm" key={index}>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center me-3" 
                     style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-person-fill"></i>
                </div>
                <h6 className="mb-0 fw-bold">{review.title}</h6>
              </div>
              <p className="mb-2">{review.comment}</p>
              <div className="d-flex justify-content-between align-items-center">
                <StarRating rating={review.rating} />
                <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;