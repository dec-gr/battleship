import './style.css';

const grid = [
  [
    { state: null, ship: null }, // 0, 0
    { state: null, ship: null }, // 0, 1
    { state: 0, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: 0, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: 0, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null }, // 1, 0
    { state: null, ship: null }, // 1, 1
    { state: null, ship: null },
    { state: null, ship: null },
    { state: 1, ship: { sunk: true } },
    { state: 1, ship: { sunk: true } },
    { state: 1, ship: { sunk: true } },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: 0, ship: null },
    { state: 0, ship: null },
    { state: 0, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: 1, ship: { sunk: false } },
    { state: 1, ship: { sunk: false } },
    { state: 1, ship: { sunk: false } },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
  [
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
    { state: null, ship: null },
  ],
];

const playerBoard = document.querySelector('.player-board');

for (let i = 0; i <= 9; i += 1) {
  const divColumn = document.createElement('div');
  for (let j = 9; j >= 0; j -= 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('data.x', i);
    square.setAttribute('data.y', j);
    square.textContent = `${i}, ${j}`;
    divColumn.appendChild(square);

    if (grid[i][j].state != null) {
      if (grid[i][j].state === 0) {
        square.classList.add('missSquare');
      } else if (grid[i][j].state === 1) {
        if (grid[i][j].ship.sunk === true) {
          square.classList.add('isSunk');
        } else {
          square.classList.add('hitSquare');
        }
      }
    }
  }
  playerBoard.appendChild(divColumn);
}

// const PlayerClass = require('./player');

// const player1 = new PlayerClass();
// const comp = new PlayerClass(true);

// const letComputerAttack = true;

// const shipLengths = [2, 1];

// shipLengths.forEach((length) => {
//   let x = Number.parseInt(prompt(`X coord for ship length ${length}`), 10);
//   let y = Number.parseInt(prompt(`Y coord for ship length ${length}`), 10);
//   player1.gameBoard.placeShip(length, [x, y]);
// });

// console.log(player1.hasLost());

// console.log(player1.gameBoard);

// while (player1.hasLost() !== true) {
//   try {
//     let x;
//     let y;
//     if (letComputerAttack) {
//       [x, y] = comp.generateGuess();
//     } else {
//       x = Number.parseInt(prompt(`X coord for attack`), 10);
//       y = Number.parseInt(prompt(`Y coord for attack`), 10);
//     }
//     player1.gameBoard.recieveAttack(x, y);
//     console.log(player1.gameBoard);
//   } catch (error) {
//     if (!letComputerAttack) {
//       alert(error);
//     }
//   }
// }

// alert('All ships destroyed!!!');

// prompt player 1 for attack on player 2
// prompt player 2 for attack on player 1
// prompt player 1 for attack on player 2
// prompt plater 2 for attack on player 1
