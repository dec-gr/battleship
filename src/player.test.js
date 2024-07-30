const PlayerClass = require('./player');

test('PlayerClass() defines a player', () => {
  expect(() => PlayerClass()).toBeDefined();
});
