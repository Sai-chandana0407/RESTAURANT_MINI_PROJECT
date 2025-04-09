import express from 'express';
import { postReview, getReviewsForItem } from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, postReview); 
router.get('/:id', getReviewsForItem); 

export default router;
