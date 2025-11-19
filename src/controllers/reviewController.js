const Review = require('../models/Review');
const Game = require('../models/Game');

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('game').sort({ createdAt: -1 });
        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las reseñas',
            error: error.message
        });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('game');
        
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la reseña',
            error: error.message
        });
    }
};

const createReview = async (req, res) => {
    try {
        // Verificar que el juego existe
        const game = await Game.findById(req.body.game);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }

        const review = await Review.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Reseña creada exitosamente',
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la reseña',
            error: error.message
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('game');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Reseña actualizada exitosamente',
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la reseña',
            error: error.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Reseña eliminada exitosamente',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la reseña',
            error: error.message
        });
    }
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};