import './style.css';
const PlayerClass = require('./player');

const generateBoardFromGrid = (grid) => {
  const playerBoard = document.createElement('div');
  playerBoard.classList.add('player-board');
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
      //delete after
      // if (grid[i][j].ship != null) {
      //   square.classList.add('placedShip');
      // }
      //delete after
    }
    playerBoard.appendChild(divColumn);
  }
  return playerBoard;
};

// Initialise async await attempt

const playerBoardCont1 = document.querySelector('.board-container-left');
const player1 = new PlayerClass();

let player1Board = generateBoardFromGrid(player1.gameBoard.grid);
playerBoardCont1.appendChild(player1Board);

const populateCompShips = (compPlayer) => {
  const compShipLengths = [2, 3, 3, 4, 5];
  let shipsPlaced = 0;
  let currentLength = compShipLengths.shift();

  while (shipsPlaced < 5) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const orientationArray = ['h', 'v'];
    const origuess = Math.floor(Math.random() * 2);
    console.log(origuess);
    const orientation = orientationArray[origuess];
    try {
      console.log(orientation);
      compPlayer.gameBoard.placeShip(currentLength, [x, y], orientation);
      currentLength = compShipLengths.shift();
      shipsPlaced += 1;
    } catch {
      console.log('Failed Guess');
    }
  }
};

const playerComputer = new PlayerClass(true);
populateCompShips(playerComputer);

// Generate Comp Spots

const placePlayerShips = async () => {
  const playerShipLengths = [2, 3, 3, 4, 5];

  while (playerShipLengths.length > 0) {
    let currentLength = playerShipLengths.shift();
    await placeShipOnBoard(currentLength);
    console.log('back in the while');

    player1Board = generateBoardFromGrid(player1.gameBoard.grid);
    playerBoardCont1.innerHTML = '';
    playerBoardCont1.appendChild(player1Board);
  }

  console.log('All Ships Placed');
};

const placeShipOnBoard = (currentLength) =>
  new Promise((resolve) => {
    player1Board.addEventListener('click', (event) => {
      console.log(event.target);
      try {
        player1.gameBoard.placeShip(
          currentLength,
          [
            Number.parseInt(event.target.getAttribute('data.x'), 10),
            Number.parseInt(event.target.getAttribute('data.y'), 10),
          ],
          'h'
        );
        resolve('good');
      } catch (err) {
        console.log(err);
      }
    });
  });

const gameFlow = async () => {
  let gameOver = false;

  await placePlayerShips();
  console.log('Playing Now');
  let compGuessQueue = [];

  const boardContainerLeft = document.querySelector('.board-container-left');
  boardContainerLeft.innerHTML = '';
  const boardContainerRight = document.querySelector('.board-container-right');
  boardContainerRight.innerHTML = '';

  let playerBoard = generateBoardFromGrid(player1.gameBoard.grid);
  boardContainerLeft.appendChild(playerBoard);

  let playerComputerBoard = generateBoardFromGrid(
    playerComputer.gameBoard.grid
  );
  boardContainerRight.appendChild(playerComputerBoard);

  while (gameOver != true) {
    const squaresArray = boardContainerRight.querySelectorAll('.square');
    const playerTurn = () => {
      return new Promise((resolve) => {
        squaresArray.forEach((square) => {
          square.addEventListener('click', () => {
            console.log('Gride:');
            console.log(
              `x gride: ${square.getAttribute(
                'data.x'
              )}, y gride: ${square.getAttribute('data.y')}`
            );
            console.log(
              playerComputer.gameBoard.grid[square.getAttribute('data.x')][
                square.getAttribute('data.y')
              ]
            );

            playerComputer.gameBoard.recieveAttack(
              square.getAttribute('data.x'),
              square.getAttribute('data.y')
            );
            resolve('good');
          });
        });
      });
    };

    await playerTurn();

    playerComputerBoard = generateBoardFromGrid(playerComputer.gameBoard.grid);
    boardContainerRight.innerHTML = '';
    boardContainerRight.appendChild(playerComputerBoard);

    if (playerComputer.hasLost()) {
      alert('Player has won');
      gameOver = true;
    }

    let isValidMove = false;
    let compX;
    let compY;
    let shipHit = false;
    let shipSunk = false;
    while (isValidMove != true) {
      if (compGuessQueue.length > 0) {
        [compX, compY] = compGuessQueue.pop();
      } else {
        [compX, compY] = playerComputer.generateGuess();
      }

      try {
        shipHit = player1.gameBoard.recieveAttack(compX, compY);

        isValidMove = true;

        if (shipHit) {
          console.log(shipSunk);

          shipSunk = player1.gameBoard.grid[compX][compY].ship.sunk;
        }
      } catch {
        console.log('Failed Guess');
      }
    }

    if (shipHit && !shipSunk) {
      compGuessQueue.push([compX, compY + 1]);
      compGuessQueue.push([compX, compY - 1]);
      compGuessQueue.push([compX + 1, compY]);
      compGuessQueue.push([compX - 1, compY]);
    } else if (shipSunk) {
      compGuessQueue = [];
    }

    console.log(compGuessQueue);

    playerBoard = generateBoardFromGrid(player1.gameBoard.grid);
    boardContainerLeft.innerHTML = '';
    boardContainerLeft.appendChild(playerBoard);

    if (player1.hasLost()) {
      alert('Computer has won');
      gameOver = true;
    }
  }
};

gameFlow();
