class Game {
  constructor(id, io) {
    this.id = id;
    this.socket = io.of(`/${id}`);
  }

  toString() {
    console.log(`id: ${this.id}, socket: ${this.socket}`);
  }
}

module.exports = Game;
