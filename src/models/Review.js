const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, 'La reseña debe pertenecer a un juego']
    },
    title: {
        type: String,
        required: [true, 'El título de la reseña es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido de la reseña es obligatorio'],
        trim: true,
        minlength: [10, 'La reseña debe tener al menos 10 caracteres']
    },
    rating: {
        type: Number,
        required: [true, 'La puntuación es obligatoria'],
        min: [1, 'La puntuación mínima es 1'],
        max: [5, 'La puntuación máxima es 5']
    },
    hoursPlayed: {
        type: Number,
        required: [true, 'Las horas jugadas son obligatorias'],
        min: [0, 'Las horas no pueden ser negativas']
    },
    completionDate: {
        type: Date,
        default: Date.now
    },
    wouldRecommend: {
        type: Boolean,
        default: true
    },
    difficulty: {
        type: String,
        enum: ['Muy Fácil', 'Fácil', 'Medio', 'Difícil', 'Muy Difícil'],
        default: 'Medio'
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;