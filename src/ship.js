class shipClass {
  constructor(shipSize) {
    this.length = shipSize;
    this.sunk = false;
    this.numHits = 0;
  }

  hit() {
    this.numHits += 1;
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.numHits >= this.length;
    return this.sunk;
  }
}

module.exports = shipClass;
