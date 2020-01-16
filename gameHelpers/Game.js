const Cell = require('./Cell');

class Game {
  constructor(id, io) {
    this.rows = 8;
    this.cols = 8;
    this.id = id;
    this.socket = io.of(`/${id}`);
    this.board = this.initializeBoard();
  }

  toString() {
    console.log(`id: ${this.id}, socket: ${this.socket}`);
  }

  initializeBoard() {
    const cells = [];
    for (let i = 0; i < this.rows; i += 1) {
      cells[i] = [];
      for (let j = 0; j < this.cols; j += 1) {
        const isBlack = i * j + 8 / 8 === 0;
        const cell = new Cell(i, j, isBlack);
        cells[i][j] = cell;
      }
    }
    return cells;
  }

  getGame() {
    return {
      board: this.board,
      id: this.id,
    };
  }
}

module.exports = Game;
