const express = require('express');
const router = express.Router();
const { postReview, getReviewsForItem } = require('../controllers/reviewController');

const auth = require('../middleware/auth');

router.post('/', auth, postReview); 
router.get('/:id', getReviewsForItem); 

module.exports = router;
