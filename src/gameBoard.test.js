const GameBoardClass = require('./gameBoard');
const shipClass = require('./ship');
let gameBoard;
let empty10x10array;
beforeEach(() => {
  gameBoard = new GameBoardClass();
  empty10x10Array = [
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
});

test('gameBoardClass() defines a gameBoard', () => {
  expect(gameBoard).toBeDefined();
});

test('Newly Initialised gameBoard.grid should be an empty 10x10 grid', () => {
  expect(gameBoard.grid).toEqual(empty10x10Array);
});

test('gameBoard.recieveAttack() is defined', () => {
  expect(() => gameBoard.recieveAttack()).toBeDefined();
});

describe('Placing ship at a location', () => {
  test('gameBoard.placeShip() is defined', () => {
    expect(() => gameBoard.placeShip()).toBeDefined;
  });

  test('gameBoard.placeShip(3, [x,y]) places a ship length 3 horizontally from [x,y]', () => {
    gameBoard.placeShip(3, [0, 0]);
    expect(gameBoard.grid[0][0].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[1][0].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[2][0].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[3][0].ship).toEqual(null);
  });

  test('gameBoard.placeShip(3, [x,y], "v") places a ship length 3 vertically from [x,y]', () => {
    gameBoard.placeShip(3, [0, 0], 'v');
    expect(gameBoard.grid[0][0].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[0][1].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[0][2].ship).toEqual(new shipClass(3));
    expect(gameBoard.grid[0][3].ship).toEqual(null);
  });

  test('gameBoard.placeShip(5, [8,8]) throws Error "Ship must fit on board"', () => {
    expect(() => gameBoard.placeShip(5, [8, 8])).toThrow(
      'Ship must fit on board'
    );
  });

  test('placing a ship which overlaps another ship throws the error "Space already occupied"', () => {
    gameBoard.placeShip(3, [0, 0]);
    expect(() => gameBoard.placeShip(3, [2, 0])).toThrow(
      'Space already occupied'
    );
  });
});

describe('Attacking a ship', () => {
  test('Attacking a square updates that ships hit number', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(0, 0);
    expect(gameBoard.grid[0][0].ship.numHits).toBe(1);
  });

  test('Attacking a square updates the state of that square to 1', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(0, 0);
    expect(gameBoard.grid[0][0].state).toBe(1);
  });

  test('Missing a ship updates the state of that square to 0', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(0, 4);
    expect(gameBoard.grid[0][4].state).toBe(0);
    expect(gameBoard.grid[0][5].state).toBe(null);
  });

  test('Attacking a square updates that ships hit number on an adjacent square', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(0, 0);
    expect(gameBoard.grid[1][0].ship.numHits).toBe(1);
  });

  test('Attacking a ship length times updates isSunk on all squares', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(0, 0);
    gameBoard.recieveAttack(1, 0);
    gameBoard.recieveAttack(2, 0);
    expect(gameBoard.grid[0][0].ship.sunk).toBe(true);
    expect(gameBoard.grid[1][0].ship.sunk).toBe(true);
    expect(gameBoard.grid[2][0].ship.sunk).toBe(true);
  });

  test('Attacking the same ship square twice throws the eror "Square already tried"', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.recieveAttack(1, 0);
    expect(() => gameBoard.recieveAttack(1, 0)).toThrow('Square already tried');
  });

  //   test('Missing a ship updates that square to 0', () => {
  //     gameBoard.recieveAttack(0, 0);
  //     expect(gameBoard.grid[0][0]).toBe(0);
  //   });
});

describe('checking allSunk?', () => {
  test('sinking one of two ships results in allSunk returning false', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.placeShip(2, [0, 1]);
    gameBoard.recieveAttack(0, 0);
    gameBoard.recieveAttack(1, 0);
    gameBoard.recieveAttack(2, 0);

    expect(gameBoard.allSunk()).toBe(false);
  });

  test('sinking all ships results in allSunk returning true', () => {
    gameBoard.placeShip(3, [0, 0]);
    gameBoard.placeShip(2, [0, 1]);

    gameBoard.recieveAttack(0, 0);
    gameBoard.recieveAttack(1, 0);
    gameBoard.recieveAttack(2, 0);

    gameBoard.recieveAttack(0, 1);
    gameBoard.recieveAttack(1, 1);

    expect(gameBoard.allSunk()).toBe(true);
  });
});
