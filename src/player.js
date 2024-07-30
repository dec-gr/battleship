const GameBoardClass = require('./gameBoard');

class PlayerClass {
  constructor(isComputer = false) {
    this.gameBoard = new GameBoardClass();
    this.isComputer = isComputer;
    this.hasLost = false;
  }

  hasLost() {
    return this.gameBoard.allSunk();
  }
}

module.exports = PlayerClass;
