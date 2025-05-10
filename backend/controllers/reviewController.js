const Review = require('../models/Review');

exports.postReview = async (req, res) => {
  const { menuItemId, rating, comment } = req.body;
  try {
    const existing = await Review.findOne({ userId: req.user.id, menuItemId });

    if (existing) {
      existing.rating = rating;
      existing.comment = comment;
      await existing.save();
      return res.json(existing);
    }

    const review = await Review.create({
      userId: req.user.id,
      menuItemId,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post review' });
  }
};

exports.getReviewsForItem = async (req, res) => {
  try {
    const reviews = await Review.find({ menuItemId: req.params.id }).populate('userId');
    const average =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    res.json({ averageRating: average.toFixed(1), reviews });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};
