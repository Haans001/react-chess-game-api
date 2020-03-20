const uuid = require('uuid');
const { signPlayerWithJWT } = require('../authHelpers/authActions');

const Game = require('../gameHelpers/Game');

class GamesContainer {
  constructor() {
    this.games = {};
    this.io = require('../socket/socket').get();
  }

  addGame(game) {
    this.games[game.id] = game;
  }

  createNewGame(response) {
    const gameID = uuid();
    const socket = this.io.of(`/${gameID}`);
    const game = new Game(gameID, socket);

    this.addGame(game);
    const playerType = game.setPlayer();

    console.log(`New game created with id ${gameID}`);

    signPlayerWithJWT(playerType, gameID, (err, token) => {
      if (err) throw err;
      response.status(200).json({
        playerID: token,
        gameID,
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
