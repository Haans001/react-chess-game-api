class Player {
  constructor(type, gameId) {
    this.type = type; /* color */
    this.gameId = gameId;
  }

  getPlayer() {
    return {
      type: this.type,
      gameID: this.gameId,
    };
  }
}

module.exports = Player;
