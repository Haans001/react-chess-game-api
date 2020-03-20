const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('./socket/socket');

io.init(http);
const gameController = require('./routes/gameController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/game_controller', gameController);

const port = process.env.PORT || 5000;

http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
