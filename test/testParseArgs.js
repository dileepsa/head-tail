const assert = require('assert');
const { parseArgs, validateArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse the args when -n is given', () => {
    assert.deepStrictEqual(parseArgs(['-n', '10', 'wish.txt']), {
      fileNames: ['wish.txt'],
      optionName: '-n',
      count: 10,
    });

    assert.deepStrictEqual(parseArgs(['-n', '2', 'wish.txt']), {
      fileNames: ['wish.txt'],
      optionName: '-n',
      count: 2
    });
  });

  it('Should parse for -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '2', 'wish.txt']), {
      fileNames: ['wish.txt'],
      optionName: '-c',
      count: 2,

    });

    assert.deepStrictEqual(parseArgs(['-c', '9', 'hello.txt']), {
      fileNames: ['hello.txt'],
      optionName: '-c',
      count: 9,
    });
  });

  it('Should return only filenames and count', () => {
    assert.deepStrictEqual(parseArgs(['wish.txt']), {
      fileNames: ['wish.txt'],
      count: 10
    });

    assert.deepStrictEqual(parseArgs(['hi.txt', 'by.txt']), {
      fileNames: ['hi.txt', 'by.txt'],
      count: 10
    });
  });
});

describe('validateArgs', () => {
  it('Should throw an error if 2 options are different', () => {
    const actual = () => validateArgs(['-n', '10', '-c', '10']);
    assert.throws(actual, {
      name: 'invalidOptions',
      message: 'Cant be combined'
    });
  });
});
