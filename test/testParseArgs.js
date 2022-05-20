const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse the args when -n is given', () => {
    assert.deepStrictEqual(parseArgs(['-n', '10', 'wish.txt']), {
      fileName: 'wish.txt',
      optionName: '-n',
      count: 10,
    });

    assert.deepStrictEqual(parseArgs(['-n', '2', 'wish.txt']), {
      fileName: 'wish.txt',
      optionName: '-n',
      count: 2
    });
  });

  it('Should parse for -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'wish.txt']), {
      fileName: 'wish.txt',
      optionName: '-c',
      count: 2,

    });

    assert.deepStrictEqual(parseArgs(['-c', '9', 'hello.txt']), {
      fileName: 'hello.txt',
      optionName: '-c',
      count: 9,
    });
  });
});
