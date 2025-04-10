import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const reviews = [
  {
    title: 'Absolutely Amazing!',
    rating: 4,
    text: 'I had one of the best dining experiences here. The staff was incredibly friendly and attentive without being overbearing. Every dish we tried—from the garlic butter shrimp to the truffle risotto—was bursting with flavor and beautifully plated. The ambiance was cozy yet modern, perfect for a romantic dinner or a night out with friends. Will definitely be coming back!'
  },
  {
    title: 'Hidden Gem!',
    rating: 5,
    text: 'What a fantastic find! Tucked away on a quiet street, this place blew us away. The atmosphere was warm and welcoming, and the staff made us feel like regulars from the moment we walked in. I had the lamb shank and it was fall-off-the-bone tender—truly perfection. Their homemade desserts are a must, especially the tiramisu. Already planning our next visit!'
  },
  {
    title: 'Decent Food, But Not Worth the Hype',
    rating: 3,
    text: 'Tried this place after hearing a lot of buzz. The decor and vibe are really nice, and service was quick and polite. However, the food was just okay—my steak was overcooked, and the sides lacked seasoning. The cocktails were pretty solid though. Overall, not terrible, but I expected more for the price point.'
  }
];

const StarRating = ({ rating }) => (
  <span className="text-warning">
    {[...Array(5)].map((_, i) => (
      <i key={i} className={bi ${i < rating ? 'bi-star-fill' : 'bi-star'}}> </i>
    ))}
  </span>
);

const ReviewPage = () => {
  return (
    <div style={{ backgroundColor: '#d0dec4', minHeight: '100vh', padding: '30px' }}>
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex align-items-center mb-2">
            <img src="/img/logoimg.jpg" alt="Homely Bites "className="rounded-circle me-2"style={{ width: '60px', marginRight: '10px' }} />
            <h5 className="mt-2 fw-bold">Homely Bites</h5>
          </div>
          <div className="fw-bold fs-5">Average Rating: <StarRating rating={4} /></div>
        </div>
        <div>
          <img
            src="/img/review1.webp"
            alt="Food Collage"
            style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="fw-bold" style={{ fontFamily: 'cursive' }}>Reviews</h2>
        <p className="fst-italic" style={{ fontSize: '24px', fontFamily: 'cursive' }}>Leave us Feedback</p>
      </div>


        <div className="mt-4">
          {reviews.map((review, index) => (
            <div className="card mb-3 shadow-sm" key={index}>
              <div className="card-body d-flex">
                <div className="me-3">
                  <div className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-person-fill"></i>
                  </div>
                </div>
                <div>
                  <h6 className="fst-italic fw-bold mb-1">{review.title}</h6>
                  <p className="mb-2 small text-muted" style={{ fontSize: '14px' }}>{review.text}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <StarRating rating={review.rating} />
                    <i className="bi bi-heart"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn" style={{ backgroundColor: '#f18700', color: 'white', borderRadius: '20px', padding: '10px 40px' }}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;