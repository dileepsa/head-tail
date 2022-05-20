const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse the args when -n is given', () => {
    assert.deepStrictEqual(parseArgs(['-n', '10', 'wish.txt']), {
      fileName: 'wish.txt',
      count: 10,
      separator: '\n'
    });

    assert.deepStrictEqual(parseArgs(['-n', '2', 'wish.txt']), {
      fileName: 'wish.txt',
      count: 2,
      separator: '\n'
    });
  });
});
