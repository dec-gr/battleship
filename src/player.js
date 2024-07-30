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
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    return [x, y];
  }
}

module.exports = PlayerClass;
