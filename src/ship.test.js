const shipClass = require('./ship');

test('shipClass(3) defines a ship ', () => {
  const ship = new shipClass(3);
  expect(ship).toBeDefined();
});

test('shipClass("three") throw error "Int required for ship size"', () => {
  const ship = new shipClass('three');
  expect(ship).toBeDefined();
});

describe('testing fresh ship properties (ship length 3)', () => {
  const ship = new shipClass(3);

  test('ship is defined', () => {
    expect(ship).toBeDefined;
  });

  test('ship.length returns 3', () => {
    expect(ship.length).toBe(3);
  });

  test('ship.sunk returns false', () => {
    expect(ship.sunk).toBe(false);
  });

  test('ship.numHits returns 0', () => {
    expect(ship.numHits).toBe(0);
  });

  test('ship.hit is defined', () => {
    expect(ship.hit()).toBeDefined;
  });
});

describe('testing hits on a new ship (length 3)', () => {
  //const ship = new shipClass(3);
  let ship;
  beforeEach(() => {
    ship = new shipClass(3);
  });

  test('ship.hit() increases numHits by 1', () => {
    ship.hit();
    expect(ship.numHits).toBe(1);
  });

  test('two calls to ship.hit() increase hits by 2', () => {
    ship.hit();
    ship.hit();
    expect(ship.numHits).toBe(2);
  });

  test('two calls to ship.hit() on ship length 3 does not update sunk to true', () => {
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(false);
  });

  test('three calls two ship.hit() increase hits by 3', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.numHits).toBe(3);
  });

  test('three hits to a ship length three updates sunk to true', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });
});

// test('Ship(3) returns new Ship of length 3 with sunk equal to false', () =>{
//     expect(ship(3).toEqual({

//     }))
// })
