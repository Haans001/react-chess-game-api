const Cell = require('./Cell');
const Player = require('../authHelpers/Player');

class Game {
  constructor(id, socket) {
    this.rows = 8;
    this.cols = 8;
    this.id = id;
    this.socket = socket;
    this.board = this.initializeBoard();
    this.players = {
      white: null,
      black: null,
      viewers: [],
    };
    this.isFull = this.isFull.bind(this);
    this.setUpSocket();
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

    /* white */
    cells[0][0].setPiece('white', 'rook');
    cells[0][1].setPiece('white', 'knight');
    cells[0][2].setPiece('white', 'bishop');
    cells[0][3].setPiece('white', 'king');
    cells[0][4].setPiece('white', 'queen');
    cells[0][5].setPiece('white', 'bishop');
    cells[0][6].setPiece('white', 'knight');
    cells[0][7].setPiece('white', 'rook');
    for (let i = 0; i < this.cols; i += 1) {
      cells[1][i].setPiece('white', 'pawn');
    }

    /* black */
    cells[7][0].setPiece('black', 'rook');
    cells[7][1].setPiece('black', 'knight');
    cells[7][2].setPiece('black', 'bishop');
    cells[7][3].setPiece('black', 'king');
    cells[7][4].setPiece('black', 'queen');
    cells[7][5].setPiece('black', 'bishop');
    cells[7][6].setPiece('black', 'knight');
    cells[7][7].setPiece('black', 'rook');
    for (let i = 0; i < this.cols; i += 1) {
      cells[6][i].setPiece('black', 'pawn');
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

  join() {
    const playerType = this.setPlayer();
    return playerType;
  }

  isFull() {
    return !(this.players.black && this.players.white) ? false : true;
  }

  setUpSocket() {
    this.socket.on('connection', socket => {
      console.log(`Socket Connected with ${this.id}`);
      socket.on('join_game', () =>
        this.socket.emit('get_game', { game: this.getGame() }),
      );
    });
  }
}

module.exports = Game;
