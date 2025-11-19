const express = require('express');
const router = express.Router();
const {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameController');

router.route('/')
    .get(getGames)
    .post(createGame);

router.route('/:id')
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame);

module.exports = router;