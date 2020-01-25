const router = require('express').Router();
const uuid = require('uuid');
const http = require('../app');
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

/* middleware */
const verifyPlayer = require('../middleware/verifyPlayer');

/* game objects */
const games = require('../gameHelpers/GamesContainer')();

/* helpers */
const { signPlayerWithJWT } = require('../authHelpers/authActions');

router.get('/create_new_game', (req, res) => games.createNewGame(res));

router.get('/join_game/:gameID', (req, res) => {
  const { gameID } = req.params;
  const game = games.getGame(gameID);
  if (game) {
    const playerType = game.setPlayer();
    signPlayerWithJWT(playerType, gameID, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        playerID: token,
        game: game.getGame(),
      });
    });
  } else {
    res.status(400).json({ msg: 'Join to game failed' });
  }
});

// router.post('/verify_player', (req, res) => {
//   const { game_id, token } = req.body;
//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       res.send(400).json({ msg: 'Your game expired' });
//     }
//     const { gameID, playerType } = decoded;
//     if (gameID === game_id) {
//       res.status(200).json({ msg: `You are ${playerType}` });
//     } else {
//       res.status(200).json({ msg: 'You dont belong to this game' });
//     }
//   });
// });

router.get('/get_game/:game_id', (req, res) => {
  const { game_id } = req.params;
  const game = games.getGame(game_id);
  if (game) {
    res.status(200).json({ game: game.getGame() });
  } else {
    res.status(400).json({ msg: 'Game doesnt exist' });
  }
});

/*
  @route GET /game_controller/get_player/:token/:gameID
  @desc Gets a player data by its token and game
  @access private
*/
router.get('/get_player/:token/:gameID', verifyPlayer, (req, res) => {
  res.status(200).json(req.player);
});

module.exports = router;
