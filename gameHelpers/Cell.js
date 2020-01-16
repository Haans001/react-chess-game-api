class Cell {
  constructor(i, j, isBlack) {
    this.x = i;
    this.y = j;
    this.isBlack = isBlack;
    this.number = Math.floor(Math.random() * (20 - 10)) + 10;
  }
}
module.exports = Cell;
