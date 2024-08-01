const ShipClass = require('./ship');

class GameBoardClass {
  constructor() {
    this.grid = GameBoardClass.initialiseGrid();
    this.ships = [];
  }

  placeShip(length, [x, y], orientation = 'h') {
    const horizontal = orientation === 'h';
    const vertical = !horizontal;

    // these could be split into other functions for checking
    // check ship fits on board
    if (x + length * horizontal > 10 || y + length * vertical > 10) {
      throw new Error('Ship must fit on board');
    }

    // check space is clear
    for (let i = 0; i < length; i += 1) {
      if (this.grid[x + i * horizontal][y + i * vertical].ship != null) {
        throw new Error('Space already occupied');
      }
    }

    // place ship
    const ship = new ShipClass(length);
    this.ships.push(ship);
    for (let i = 0; i < length; i += 1) {
      this.grid[x + i * horizontal][y + i * vertical].ship = ship;
    }
  }

  recieveAttack(x, y) {
    if (this.grid[x][y].state != null) {
      console.log(`X: ${x}, Y: ${y}`);
      console.log(`State: ${this.grid[x][y]}`);
      console.log(this.grid[x][y]);

      throw new Error('Square already tried');
    } else if (this.grid[x][y].ship == null) {
      this.grid[x][y].state = 0;
    } else {
      this.grid[x][y].ship.hit();
      this.grid[x][y].state = 1;
    }
  }

  allSunk() {
    return this.ships.reduce((acc, item) => acc && item.sunk, true);
  }

  static initialiseGrid() {
    const grid = new Array(10).fill(null).map(() => new Array(10).fill(null));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        grid[i][j] = { state: null, ship: null };
      }
    }

    return grid;
  }
}

module.exports = GameBoardClass;
