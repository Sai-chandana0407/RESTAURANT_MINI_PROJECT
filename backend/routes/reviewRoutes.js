const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/authMiddleware');
const staffAuth = require('../middleware/staffAuth');

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'name');
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// Get reviews for a specific restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const reviews = await Review.find({ restaurant: req.params.restaurantId })
            .populate('user', 'name');
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching restaurant reviews:', error);
        res.status(500).json({ message: 'Error fetching restaurant reviews', error: error.message });
    }
});

// Create a new review
router.post('/', protect, async (req, res) => {
    try {
        const { restaurant, rating, comment } = req.body;
        
        if (!restaurant || !rating) {
            return res.status(400).json({ message: 'Restaurant and rating are required' });
        }

        const review = new Review({
            user: req.user._id,
            restaurant,
            rating,
            comment: comment || ''
        });

        const savedReview = await review.save();
        const populatedReview = await Review.findById(savedReview._id).populate('user', 'name');
        
        res.status(201).json(populatedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating review', error: error.message });
    }
});

// Update a review
router.put('/:id', protect, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).populate('user', 'name');

        res.json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
});

// Delete a review
router.delete('/:id', protect, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

router.get('/protected-route', staffAuth, (req, res) => {
  // Route logic here
});

module.exports = router; 