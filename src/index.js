import './style.css';
const PlayerClass = require('./player');

const generateBoardFromGrid = (grid, showShips = false) => {
  const playerBoard = document.createElement('div');
  playerBoard.classList.add('player-board');
  for (let i = 0; i <= 9; i += 1) {
    const divColumn = document.createElement('div');
    for (let j = 9; j >= 0; j -= 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('data.x', i);
      square.setAttribute('data.y', j);
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
      if (showShips) {
        if (grid[i][j].ship != null) {
          square.classList.add('placedShip');
        }
      }
    }
    playerBoard.appendChild(divColumn);
  }
  return playerBoard;
};

const populateCompShips = (compPlayer) => {
  const compShipLengths = [2, 3, 3, 4, 5];
  let shipsPlaced = 0;
  let currentLength = compShipLengths.shift();

  while (shipsPlaced < 5) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const orientationArray = ['h', 'v'];
    const origuess = Math.floor(Math.random() * 2);
    const orientation = orientationArray[origuess];
    try {
      compPlayer.gameBoard.placeShip(currentLength, [x, y], orientation);
      currentLength = compShipLengths.shift();
      shipsPlaced += 1;
    } catch {}
  }
};

const playerPlaceShipsStep = async () =>
  new Promise((resolve) => {
    const shipSelector = document.querySelector('.selector');
    shipSelector.addEventListener('click', (event) => {
      const { target } = event;
      let chosenShip = target;
      if (target.classList.contains('templateSquare')) {
        chosenShip = target.parentElement;
      }
      placingFunc(
        Number.parseInt(chosenShip.getAttribute('data-length'), 10),
        chosenShip
      );
    });

    const placingFunc = async (currentLength, chosenShip) => {
      const shipCont = shipSelector.querySelector('.shipCont');
      let orientation = shipCont.getAttribute('data-orientation');

      const allShips = [...shipCont.children];
      allShips.forEach((ship) => {
        ship.classList.remove('highlightShipTemplate');
      });

      player1Board = generateBoardFromGrid(player1.gameBoard.grid, true);
      playerBoardCont1.innerHTML = '';
      playerBoardCont1.appendChild(placeShipsHeader);
      playerBoardCont1.appendChild(player1Board);

      if (chosenShip.classList.contains('bodyObject')) {
        return;
      }
      if (chosenShip.id === 'rotateBtn') {
        orientation = orientation === 'h' ? 'v' : 'h';
        shipCont.setAttribute('data-orientation', orientation);
        if (orientation === 'v') {
          shipCont.classList.add('vertical');
        } else {
          shipCont.classList.remove('vertical');
        }

        return;
      }

      chosenShip.classList.add('highlightShipTemplate');

      const squaresArr = document.querySelectorAll('.square');

      squaresArr.forEach((square) => {
        const parentDiv = square.parentElement;
        const children = [...parentDiv.children];

        const currentY = Number.parseInt(square.getAttribute('data.y'), 10);
        const currentX = Number.parseInt(square.getAttribute('data.x'), 10);

        let adjacentSquares = [];
        let divs = [];
        let divs2 = [];
        let sqs = [];

        let start = 0;
        let end = 0;

        if (orientation === 'v') {
          adjacentSquares = children.slice(
            10 - currentY - currentLength,
            9 - currentY
          );
        } else {
          divs = [...document.querySelector('.player-board').children];
          start = currentX;
          end = currentX + currentLength;
          divs2 = divs.slice(start, end);
          sqs = divs2.map((div) => [...div.children][9 - currentY]);
          adjacentSquares = sqs;
        }

        square.addEventListener('mouseover', () => {
          square.classList.add('highlight');
          adjacentSquares.forEach((adjSquare) =>
            adjSquare.classList.add('highlight')
          );
        });
        square.addEventListener('mouseout', () => {
          square.classList.remove('highlight');
          adjacentSquares.forEach((adjSquare) =>
            adjSquare.classList.remove('highlight')
          );
        });
      });
      const isShipPlaced = await placeShipOnBoard(currentLength, orientation);
      if (isShipPlaced === 'ship placed') {
        chosenShip.remove();

        if (checkIfShipsAllPlaced()) {
          resolve('Play game');
        }
      }

      player1Board = generateBoardFromGrid(player1.gameBoard.grid, true);
      playerBoardCont1.innerHTML = '';
      playerBoardCont1.appendChild(placeShipsHeader);
      playerBoardCont1.appendChild(player1Board);
    };
  });

const checkIfShipsAllPlaced = () => {
  const shipCont = document.querySelector('.shipCont');
  return shipCont.children.length === 0;
};

const placeShipOnBoard = (currentLength, orientation) =>
  new Promise((resolve) => {
    player1Board.addEventListener('click', (event) => {
      try {
        player1.gameBoard.placeShip(
          currentLength,
          [
            Number.parseInt(event.target.getAttribute('data.x'), 10),
            Number.parseInt(event.target.getAttribute('data.y'), 10),
          ],
          orientation
        );
        resolve('ship placed');
      } catch (err) {
        console.log(err);
      }
    });
  });

const gameEndTransition = (playerWon = true) => {
  const gameEndCont = document.createElement('div');
  gameEndCont.classList.add('gameEndCont');

  const gameEndText = document.createElement('div');
  gameEndText.classList.add('endGameText');

  if (playerWon) {
    gameEndCont.classList.add('greenBackground');
    gameEndText.textContent = 'YOU HAVE WON';
  } else {
    gameEndCont.classList.add('redBackground');
    gameEndText.textContent = 'THE COMPUTER HAS WON';
  }

  const restartBtn = document.createElement('button');
  restartBtn.textContent = 'RESTART';
  restartBtn.classList.add('restartBtn');
  restartBtn.addEventListener('click', () => {
    location.reload();
  });
  gameEndCont.appendChild(gameEndText);
  gameEndCont.appendChild(restartBtn);
  return gameEndCont;
};

const gameFlow = async () => {
  let gameOver = false;
  let playerWon;

  await playerPlaceShipsStep();

  const allyHeader = document.createElement('h2');
  allyHeader.textContent = 'Ally Waters';
  allyHeader.classList.add('headerText');

  const enemyHeader = document.createElement('h2');
  enemyHeader.textContent = 'Enemy Waters';
  enemyHeader.classList.add('headerText');

  const gameContainer = document.querySelector('.game-container');

  const shipSelector = document.querySelector('.selector');
  shipSelector.remove();

  const boardContainerRight = document.createElement('div');
  boardContainerRight.classList.add('board-container-right');
  boardContainerRight.innerHTML = '';

  gameContainer.appendChild(boardContainerRight);

  let compGuessQueue = [];

  const body = document.querySelector('body');
  const boardContainerLeft = document.querySelector('.board-container-left');
  boardContainerLeft.innerHTML = '';

  let playerBoard = generateBoardFromGrid(player1.gameBoard.grid, true);
  boardContainerLeft.appendChild(allyHeader);
  boardContainerLeft.appendChild(playerBoard);

  let playerComputerBoard = generateBoardFromGrid(
    playerComputer.gameBoard.grid
  );
  boardContainerRight.appendChild(enemyHeader);
  boardContainerRight.appendChild(playerComputerBoard);

  while (gameOver !== true) {
    const squaresArray = boardContainerRight.querySelectorAll('.square');
    const playerTurn = () =>
      new Promise((resolve) => {
        squaresArray.forEach((square) => {
          square.addEventListener('click', () => {
            playerComputer.gameBoard.recieveAttack(
              square.getAttribute('data.x'),
              square.getAttribute('data.y')
            );
            resolve('good');
          });
        });
      });

    await playerTurn();

    playerComputerBoard = generateBoardFromGrid(playerComputer.gameBoard.grid);
    boardContainerRight.innerHTML = '';
    boardContainerRight.appendChild(enemyHeader);
    boardContainerRight.appendChild(playerComputerBoard);

    if (playerComputer.hasLost()) {
      playerWon = true;
      gameOver = true;
    }

    let isValidMove = false;
    let compX;
    let compY;
    let shipHit = false;
    let shipSunk = false;
    while (isValidMove !== true) {
      if (compGuessQueue.length > 0) {
        [compX, compY] = compGuessQueue.pop();
      } else {
        [compX, compY] = playerComputer.generateGuess();
      }

      try {
        shipHit = player1.gameBoard.recieveAttack(compX, compY);

        isValidMove = true;

        if (shipHit) {
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

    playerBoard = generateBoardFromGrid(player1.gameBoard.grid, true);
    boardContainerLeft.innerHTML = '';
    boardContainerLeft.appendChild(allyHeader);
    boardContainerLeft.appendChild(playerBoard);

    if (player1.hasLost()) {
      playerWon = false;
      gameOver = true;
    }
  }

  const gameOverScreen = gameEndTransition(playerWon);

  body.appendChild(gameOverScreen);
};

console.log('We are in Index');

const playerBoardCont1 = document.querySelector('.board-container-left');
const player1 = new PlayerClass();

const placeShipsHeader = document.createElement('h2');
placeShipsHeader.textContent = 'Place your ships';
placeShipsHeader.classList.add('headerText');

let player1Board = generateBoardFromGrid(player1.gameBoard.grid, true);
playerBoardCont1.appendChild(placeShipsHeader);
playerBoardCont1.appendChild(player1Board);

const playerComputer = new PlayerClass(true);
populateCompShips(playerComputer);

console.log('Starting Game Flow');

gameFlow();
