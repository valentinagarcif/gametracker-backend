const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título del juego es obligatorio'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    platform: {
        type: String,
        required: [true, 'La plataforma es obligatoria'],
        enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Multiplataforma']
    },
    genre: {
        type: String,
        required: [true, 'El género es obligatorio'],
        enum: ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Shooter', 'Indie', 'Simulación']
    },
    releaseYear: {
        type: Number,
        min: [1970, 'El año debe ser mayor a 1970'],
        max: [new Date().getFullYear() + 2, 'El año no puede ser tan futuro']
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/300x400?text=Game+Image'
    },
    status: {
        type: String,
        enum: ['Por jugar', 'Jugando', 'Completado', 'Abandonado'],
        default: 'Por jugar'
    },
    rating: {
        type: Number,
        min: [1, 'La puntuación mínima es 1'],
        max: [5, 'La puntuación máxima es 5'],
        default: 0
    },
    hoursPlayed: {
        type: Number,
        min: [0, 'Las horas no pueden ser negativas'],
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    addedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;