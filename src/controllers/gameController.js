const Game = require('../models/Game');

const getGames = async (req, res) => {
    try {
        const games = await Game.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: games.length,
            data: games
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los juegos',
            error: error.message
        });
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }

        res.json({
            success: true,
            data: game
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el juego',
            error: error.message
        });
    }
};

const createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        
        res.status(201).json({
            success: true,
            message: 'Juego creado exitosamente',
            data: game
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el juego',
            error: error.message
        });
    }
};

const updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Juego actualizado exitosamente',
            data: game
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el juego',
            error: error.message
        });
    }
};

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);

        if (!game) {
            return res.status(404).json({
                success: false,
                message: 'Juego no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Juego eliminado exitosamente',
            data: game
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el juego',
            error: error.message
        });
    }
};

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};