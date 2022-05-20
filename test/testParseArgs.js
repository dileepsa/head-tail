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

  it('Should parse for -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'wish.txt']), {
      fileName: 'wish.txt',
      count: 2,
      separator: '',
    });

    assert.deepStrictEqual(parseArgs(['-c', '9', 'hello.txt']), {
      fileName: 'hello.txt',
      count: 9,
      separator: '',
    });
  });

  it('Should set default values when no option is specified', () => {
    assert.deepStrictEqual(parseArgs(['wish.txt']), {
      fileName: 'wish.txt',
      count: 10,
      separator: '\n'
    });
  });
});
