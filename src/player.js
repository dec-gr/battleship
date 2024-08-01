const GameBoardClass = require('./gameBoard');

class PlayerClass {
  constructor(isComputer = false) {
    this.gameBoard = new GameBoardClass();
    this.isComputer = isComputer;
  }

  hasLost() {
    return this.gameBoard.allSunk();
  }

  generateGuess() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}

module.exports = PlayerClass;
