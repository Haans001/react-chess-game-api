const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const games = require('../gameHelpers/GamesContainer')();

function verifyPlayer(req, res, next) {
  const { token, gameID } = req.params;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.status(400).json({ msg: 'You dont belong to this game' });
    } else if (decoded.gameID !== gameID && gameID) {
      res.status(400).json({ msg: 'You dont belong to this game' });
    } else {
      req.player = decoded;
      req.game = games.getGame(gameID);
      next();
    }
  });
}

module.exports = verifyPlayer;
