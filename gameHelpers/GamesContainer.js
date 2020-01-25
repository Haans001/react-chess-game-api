const uuid = require('uuid');
const http = require('../app');
const io = require('socket.io')(http);
const { signPlayerWithJWT } = require('../authHelpers/authActions');

const Game = require('../gameHelpers/Game');

class GamesContainer {
  constructor() {
    this.games = {};
  }

  addGame(game) {
    this.games[game.id] = game;
  }

  createNewGame(response) {
    const gameID = uuid();
    const game = new Game(gameID, io);

    this.addGame(game);
    const playerType = game.setPlayer();

    console.log(`New game created with id ${gameID}`);

    signPlayerWithJWT(playerType, gameID, (err, token) => {
      if (err) throw err;
      response.status(200).json({
        playerID: token,
        game: game.getGame(),
      });
    });
  }

  getGame(id) {
    return this.games[id];
  }

  removeGame(id) {
    delete this.games[id];
  }
}

const games = new GamesContainer();

module.exports = function() {
  return games;
};
