const Cell = require('./Cell');
const Player = require('../authHelpers/Player');

class Game {
  constructor(id, io) {
    this.rows = 8;
    this.cols = 8;
    this.id = id;
    this.socket = io.of(`/${id}`);
    this.board = this.initializeBoard();
    this.players = {
      white: null,
      black: null,
      viewers: [],
    };
    this.isFull = this.isFull.bind(this);
  }

  initializeBoard() {
    const cells = [];
    let counter = 0;
    for (let i = 0; i < this.rows; i += 1) {
      cells[i] = [];
      for (let j = 0; j < this.cols; j += 1) {
        const isBlack = parseInt(counter / 8 + counter, 10) % 2 !== 0;
        const cell = new Cell(i, j, isBlack);
        cells[i][j] = cell;
        counter += 1;
      }
    }
    return cells;
  }

  setPlayer() {
    const { white, black } = this.players;
    let playerType;
    if (!white && !black) {
      playerType = Math.random() >= 0.5 ? 'white' : 'black';
    } else if (!white && black) {
      playerType = 'white';
    } else if (white && !black) {
      playerType = 'black';
    }
    const player = new Player(playerType, this.id);
    this.players[playerType] = player;

    return playerType;
  }

  getGame() {
    return {
      board: this.board,
      id: this.id,
      players: this.players,
      isFull: this.isFull(),
    };
  }

  isFull() {
    return !(this.players.black && this.players.white) ? false : true;
  }
}

module.exports = Game;
