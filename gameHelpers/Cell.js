class Cell {
  constructor(i, j, isBlack) {
    this.x = i;
    this.y = j;
    this.isBlack = isBlack;
    this.piece = {};
  }

  setPiece(color, piece) {
    this.piece.color = color;
    this.piece.piece = piece;
  }
}

module.exports = Cell;
