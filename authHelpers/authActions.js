const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

function signPlayerWithJWT(playerType, gameID, callback) {
  jwt.sign({ playerType, gameID }, jwtSecret, { expiresIn: 7200 }, callback);
}

module.exports = {
  signPlayerWithJWT,
};
