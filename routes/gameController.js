const router = require('express').Router();
const uuid = require('uuid');
const http = require('../app');
const io = require('socket.io')(http);

const Game = require('../gameHelpers/Game');

const activeGames = {};

function getGames() {
  const result = {};

  Object.keys(activeGames).forEach(key => {
    result[key] = activeGames[key].getGame();
  });
  return result;
}

router.get('/create_new_game', (req, res) => {
  const id = uuid();
  const game = new Game(id, io);
  activeGames[id] = game;
  console.log(`New game created with id ${id}`);
  res.status(200).json(game.getGame());
});

router.get('/get_games', (req, res) => {
  res.status(200).json({ games: getGames() });
});

router.get('/get_game/:game_id', (req, res) => {
  const { game_id } = req.params;
  const game = activeGames[game_id];
  if (game) {
    res.status(200).json({ game: game.getGame() });
  } else {
    res.status(400).json({ msg: 'Game doesnt exist' });
  }
});

module.exports = router;
