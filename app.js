const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const uuid = require('uuid');

const Game = require('./gameHelpers/Game');

const activeGames = [];

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  const newGame = new Game(uuid(), io);
  activeGames.push(newGame.id);
  res.status(200).json({ msg: `Game started with id ` });
});

app.get('/get_games', (req, res) => {
  console.log(activeGames);
  res.status(200).json({ games: activeGames });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
