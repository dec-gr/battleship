import './style.css';

const gameBoardClass = require('./gameBoard');
const shipClass = require('./ship');

const gameBoard = new gameBoardClass();

console.log(gameBoard.grid);

gameBoard.placeShip(3, [0, 0]);

console.log(gameBoard.grid[0][0].ship);

console.log(gameBoard.grid);

gameBoard.recieveAttack(0, 0);
gameBoard.recieveAttack(1, 0);

gameBoard.placeShip(5, [0, 1], 'v');

console.log(gameBoard.ships);

const testArray = [
  { ship: { length: 3, sunk: true } },
  { ship: { length: 3, sunk: false } },
  { ship: { length: 3, sunk: true } },
];

const res = testArray.reduce((acc, item) => {
  return acc && item.ship.sunk;
}, true);

console.log('RES: ' + res);

gameBoard.recieveAttack(2, 0);

// const newShip = new shipClass(3);
// console.log(newShip);

// const gameRow = [null, null, null, null, null, null, null, null];

// gameRow[1] = newShip;
// gameRow[2] = newShip;

// gameRow[1].hit();

// console.log(gameRow);
