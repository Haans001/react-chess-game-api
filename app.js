const express = require('express');

const app = express();
const http = require('http').createServer(app);
const gameController = require('./routes/gameController');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/game_controller', gameController);

app.use(express.json());

// app.get('/', (req, res) => {
//   const id = uuid();
//   const newGame = new Game(id, io);
//   activeGames[id] = newGame;
//   res.status(200).json({ msg: 'Game started' });
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = http;
