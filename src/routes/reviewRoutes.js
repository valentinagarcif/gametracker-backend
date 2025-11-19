const express = require('express');
const router = express.Router();
const {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Rutas para /api/reviews
router.route('/')
    .get(getReviews)
    .post(createReview);

router.route('/:id')
    .get(getReviewById)
    .put(updateReview)
    .delete(deleteReview);

module.exports = router;